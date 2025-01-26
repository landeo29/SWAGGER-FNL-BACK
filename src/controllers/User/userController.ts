import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../../models/User/user";
import path from "path";
import fs from "fs";
import { UserResponses } from "../../models/User/user_responses";
import { Hierarchical_level } from "../../models/User/hierarchical_level";
import { AgeRange } from "../../models/User/ageRange";
import Sequelize from "sequelize";
import { readFile, utils } from "xlsx";
import { generarPassword } from "../../utils/utils";
import { Op } from "sequelize";
import { emailQueue } from "../../services/EmailQueue";
import { Message } from "../../models/ChatBot/message";
import { UserEstresSession } from "../../models/Clasificacion/userestressession";
import { Role } from "../../models/User/role";
import { Empresas } from "../../models/Global/empresas";
import { Gender } from "../../models/User/gender";


class UserController {
  async login(req: any, res: any) {
    const { username, password } = req.body;
    try {
      const user = await User.findOne({
        where: { username },
        include: [{ model: Role, as: 'role' },
          {model: Empresas, as: 'empresa' }
        ]
      });
      if (!user) {
        return res.status(401).json({ error: "Credenciales inválidas" });
      }
      if (!user.role) {
        return res.status(403).json({ error: "El usuario no tiene un rol asignado" });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ error: "Credenciales inválidas" });
      }
  
      const jwt_secret = process.env.JWT_SECRET || "";
      const token = jwt.sign(
        { userId: user.id, username: user.username, role: user.role.name },
        jwt_secret,
        { expiresIn: "1h" }
      );
  
      return res.status(200).json({
        message: "Login exitoso",
        token,
        userId: user.id,
        username: user.username,
        email: user.email,
        role: user.role.name,
        permisopoliticas: user.permisopoliticas,
        userresponsebool: user.userresponsebool,
        testestresbool: user.testestresbool,
        id_empresa: user.empresa_id,
        nombre_empresa: user.empresa.nombre
      });
    } catch (error) {
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }
  

  async createUser(req: any, res: any) {
    const { username, password, email, empresa_id, role_id } = req.body;
    const file = req.file;

    try {
      if (!username || !password || !email || !role_id) {
        return res
          .status(400)
          .json({ error: "Todos los campos son obligatorios" });
      }

      let profileImagePath = null;
      if (file) {
        const uploadDir = path.join(__dirname, "../imagenes");
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }
        profileImagePath = `/imagenes/${file.filename}`;
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await User.create({
        username,
        password: hashedPassword,
        email,
        profileImage: profileImagePath,
        created_at: new Date(),
        empresa_id,
        role_id,
      });

      res
        .status(201)
        .json({ message: "Usuario creado correctamente.", data: user });
    } catch (error) {
      console.error("Error al crear el usuario:", error);
      res.status(500).json({ error: "Error interno del servidor." });
    }
  }

  async getUserProfile(req: any, res: any) {
    try {
      const userProfile = await UserResponses.findOne({
        where: { user_id: req.params.id },
        include: [
          { model: User, attributes: ["username", "email", "profileImage", "empresa_id", "role_id"] }, 
          { model: Hierarchical_level, attributes: ["level"] },
          {model: AgeRange, attributes: ['age_range'],},
          {model: Gender, attributes: ['gender'],},
        ],
      });

      const userEstres = await UserEstresSession.findOne({
        where: {
          user_id: req.params.id 
        },
        attributes: ["estres_nivel_id"],
      })

      const messageUserDates = await Message.findAll({
        where: { user_id: req.params.id }, // Filtrar por user_id
        attributes: [
          [Sequelize.fn('DATE', Sequelize.col('created_at')), 'unique_date'], // Extraer solo la fecha
        ],
        group: [Sequelize.fn('DATE', Sequelize.col('created_at'))], // Agrupar por fecha
        order: [[Sequelize.fn('DATE', Sequelize.col('created_at')), 'ASC']], // Ordenar las fechas de forma ascendente
      });


      if (!userProfile) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }

      if (!userEstres) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }

      const now = new Date();
      const endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      const dias_no_usados = endDate.getDate() - messageUserDates.length 

      const response = {
        username: userProfile.user.username,
        email: userProfile.user.email,
        hierarchicalLevel: userProfile.hierarchical_level.level,
        age_range: userProfile.age_range.age_range,
        gender: userProfile.gender.gender,
        profileImage: userProfile.user.profileImage,
        id_empresa: userProfile.user.empresa_id,
        role_id: userProfile.user.role_id, 
        nivel_estres: userEstres?.estres_nivel_id,
        dias_usados: messageUserDates.length,
        dias_no_usados: dias_no_usados
      };

      return res.json(response);
    } catch (error) {
      console.error("Error al obtener el perfil de usuario:", error);
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  }

  async updateProfile(req: any, res: any) {
    const { id } = req.params;
    const { username, email, role_id } = req.body;

    try {
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }

      if (username) user.username = username;
      if (email) user.email = email;
      if (role_id) user.role_id = role_id; 

      if (req.file) {
        const newProfileImagePath = `/imagenes/${req.file.filename}`;
        user.profileImage = newProfileImagePath;
      }

      await user.save();
      res
        .status(200)
        .json({ message: "Perfil actualizado correctamente.", data: user });
    } catch (error) {
      console.error("Error al actualizar el perfil:", error);
      res.status(500).json({ error: "Error interno del servidor." });
    }
  }

  async getAllUsers(_req: any, res: any) {
    try {
      const users = await User.findAll();
      res.status(200).json(users);
    } catch (error) {
      console.error("Error al obtener los usuarios:", error);
      res.status(500).json({ error: "Error al obtener los usuarios" });
    }
  }

  async updateUser(req: any, res: any) {
    const { id } = req.params;
    const {
      username,
      email,
      password,
      permisopoliticas,
      funcyinteract,
      userresponsebool,
      testestresbool,
      role_id,
    } = req.body;

    try {
      const user = await User.findByPk(id);

      if (!user) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }

      if (username) user.username = username;
      if (email) user.email = email;
      if (password) user.password = await bcrypt.hash(password, 10);
      if (permisopoliticas !== undefined)
        user.permisopoliticas = permisopoliticas;
      if (funcyinteract !== undefined) user.funcyinteract = funcyinteract;

      if (userresponsebool !== undefined) {
        user.userresponsebool =
          userresponsebool === true || userresponsebool === "true";
      }

      if (testestresbool !== undefined) {
        user.testestresbool =
          testestresbool === true || testestresbool === "true";
      }

      if (role_id) user.role_id = role_id;

      await user.save();

      res
        .status(200)
        .json({ message: "Usuario actualizado correctamente", data: user });
    } catch (error) {
      console.error("Error al actualizar el usuario:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }

  async getUserById(req: any, res: any) {
    const { id } = req.params;

    try {
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }
      res.status(200).json(user);
    } catch (error) {
      console.error("Error al obtener el usuario:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }


  async registerBulk(req: any,res: any){
    try {
      const { empresa_id } = req.query;
      if (!req.file) {
          return res.status(400).json({ message: "No file uploaded" });
      }

      // Leer el archivo subido
      const filePath = req.file.path;
      const workbook = readFile(filePath);
      const sheetName = workbook.SheetNames[0]; // Seleccionar la primera hoja
      const sheetData = utils.sheet_to_json(workbook.Sheets[sheetName]);

      const cant_user = await User.count({where: empresa_id}) //cantidad de usuarios que tiene actualmente

      //validar la cantidad maxima de usuarios a registrar
      const MAX_USERS = 50 - cant_user;

      if (sheetData.length > MAX_USERS) {
          return res.status(400).json({
              message: `Solo puede registrar ${MAX_USERS}, el archivo contiene más de ${MAX_USERS} usuarios. Por favor, reduzca la cantidad.`,
          });
      }

      // Filtrar las columnas necesarias
      const extractedData = await Promise.all(
        sheetData.map(async (row: any) => {
            const password = generarPassword(8); // Generar password
            const hashedPassword = await bcrypt.hash(password, 10); // Encriptar password
            return {
                username: row.username || row.Username,
                email: row.email || row.Email,
                password, // Guardar password plano
                hashedPassword, // Guardar password encriptado
                empresa_id,
            };
        })
    );

      const uniqueUsernames = new Set();
      const uniqueEmails = new Set();
      const duplicatesInFile = extractedData.filter((item) => {
        const isDuplicate = uniqueUsernames.has(item.username) || uniqueEmails.has(item.email);
        uniqueUsernames.add(item.username);
        uniqueEmails.add(item.email);
        return isDuplicate;
      });

      if (duplicatesInFile.length > 0) {
        return res.status(400).json({
          message: "Hay usuarios o correos duplicados en el archivo.",
          duplicatesInFile,
        });
      }

      const usernames = extractedData.map((item) => item.username);
      const emails = extractedData.map((item) => item.email);

      const usuariosExistentes = await User.findAll({
        where: {
            [Op.or]: [
                { username: { [Op.in]: usernames } },
                { email: { [Op.in]: emails } },
            ],
        },
      });

      if (usuariosExistentes.length > 0) {
        const duplicatesInDb = usuariosExistentes.map((usuario) => ({
            username: usuario.username,
            email: usuario.email,
        }));

        return res.status(400).json({
            message: "Hay usuarios o correos que ya existen en la base de datos.",
            duplicatesInDb,
        });
      }
      await User.bulkCreate( extractedData.map(({password, ...rest}) => ({
        ...rest,
        password: rest.hashedPassword
      })));

      extractedData.forEach((user) => {
        console.log("enviado a bull")
        emailQueue.add({
          email: user.email,
          subject: "Bienvenido a FNL",
          body: `Tu cuenta es: ${user.email} ,Tu password es: ${user.password}`
        }, { attempts: 3 })
      })

      return res.status(200).json({ message: `${extractedData.length} Usuarios registrados exitosamente.` });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error processing file", error });
    }
  }
  

  async listCompanyUsers(req: any, res: any) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const offset = (page - 1) * limit;
      const dateFilter = req.query.date; //añadido
  
      const userId = req.userId.userId;
      console.log('userId:', userId);
  
      if (!userId) {
        return res.status(400).json({
          message: 'User ID is missing or invalid'
        });
      }
  
      const currentUser = await User.findByPk(userId);
  
      if (!currentUser) {
        return res.status(404).json({
          message: 'Usuario no encontrado'
        });
      }

      if (!dateFilter) {    //añadido
        return res.status(400).json({ message: 'La fecha es requerida' });
      }
  
      const totalUsers = await User.count({
        where: {
          empresa_id: currentUser.empresa_id,
          id: {
            [Op.ne]: userId
          }
        }
      });
  
      const users = await User.findAll({
        attributes: ['id', 'username', 'email'],
        where: {
          empresa_id: currentUser.empresa_id,
          id: {
            [Op.ne]: userId
          }
        },
        include: [
          {
            model: UserResponses,
            attributes: [],
            include: [
              {
                model: Hierarchical_level,
                attributes: ['level'],
              }
            ]
          },
          {
            model: UserEstresSession,
            attributes: [ // Marcar 0 si no hay estres_nivel_id
              [Sequelize.fn('COALESCE', Sequelize.col('estres_nivel_id'), 0), 'estres_nivel_id'], 
            ],
            where: Sequelize.where(
              Sequelize.fn('DATE', Sequelize.col('created_at')),
              dateFilter // Fecha específica
            ),
            required: false, // incluye usuarios sin estres_nivel_id en la fecha
          }
        ],
        limit,
        offset,
        raw: true,
        nest: true,
        logging: console.log
      });
  
      return res.status(200).json({
        users,
        pagination: {
          total: totalUsers,
          page,
          pages: Math.ceil(totalUsers / limit)
        }
      });
  
    } catch (error: any) {
      return res.status(500).json({
        message: 'Error al obtener los usuarios',
        error: error.message
      });
    }
  }

}
export default new UserController();
