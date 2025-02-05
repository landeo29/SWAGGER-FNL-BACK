# Usa Python como base y luego instala Node.js
FROM python:3.10-bullseye

# Establece el directorio de trabajo
WORKDIR /app

# Instala Node.js, npm y dependencias de Python
RUN apt update && apt install -y nodejs npm

# Instala TypeScript globalmente
RUN npm install -g typescript

# Copia y instala dependencias de Node.js
COPY package*.json ./
RUN npm install

# Copia el código fuente
COPY . .

# Instala dependencias de Python si existe un requirements.txt
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Expone el puerto 3000
EXPOSE 3000

# Comando de inicio: permite correr tanto Node como Python
CMD ["sh", "-c", "npm run tsc && npm run start"]
