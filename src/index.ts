import app from './app'
import database from './config/database'
import { config } from 'dotenv'
config()

async function main (): Promise<void> {
  try {
    const PORT = process.env.PORT ?? 3000

    // Sincronización con la base de datos
    // await database.sync();
    await database.sync()
    // Inicialización del servidor
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`)
    })
  } catch (error) {
    console.error('Error during application initialization:', error)
    process.exit(1) // Salir del proceso si ocurre un error crítico
  }
}
main()