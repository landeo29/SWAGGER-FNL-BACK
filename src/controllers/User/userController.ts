import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../../models/User/user";
import path from "path";
import fs from "fs";
import { UserResponses } from "../../models/User/user_responses";
import { Hierarchical_level } from "../../models/User/hierarchical_level";

class UserController {
  async login(req: any, res: any) {
    const { username, password } = req.body;
    try {
      const user = await User.findOne({ where: { username } });

      if (!user) {
        return res.status(401).json({ error: "Credenciales inválidas" });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(401).json({ error: "Credenciales inválidas" });
      }
      const jwt_secret = process.env.JWT_SECRET || "";
      const token = jwt.sign(
        { userId: user.id, username: user.username },
        jwt_secret,
        { expiresIn: "1h" }
      );

      return res.status(200).json({
        message: "Login exitoso",
        token,
        userId: user.id,
        username: user.username,
        email: user.email,
        permisopoliticas: user.permisopoliticas,
        userresponsebool: user.userresponsebool,
        testestresbool: user.testestresbool,
        id_empresa: user.empresa_id,
        role_id: user.role_id, 
      });
    } catch (error) {
      console.error("Error en el login:", error);
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
          { model: User, attributes: ["email", "profileImage", "empresa_id", "role_id"] }, 
          { model: Hierarchical_level, attributes: ["level"] },
        ],
      });

      if (!userProfile) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }

      const response = {
        email: userProfile.user.email,
        hierarchicalLevel: userProfile.hierarchical_level.level,
        gender_id: userProfile.gender_id,
        profileImage: userProfile.user.profileImage,
        id_empresa: userProfile.user.empresa_id,
        role_id: userProfile.user.role_id, 
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
}
export default new UserController();
