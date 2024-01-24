const express = require("express");
const { auth } = require("express-oauth2-jwt-bearer");
const errorHandler = require("./middlewares/errorHandler");
const mongoose = require('mongoose');
require('dotenv').config();

const { OAUTH_AUDIENCE, OAUTH_URL, PORT, MONGO_DB } = process.env;

// Conectar a MongoDB
mongoose.connect(MONGO_DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conexión a MongoDB establecida con éxito');
  })
  .catch((error) => {
    console.error('Error al conectar a MongoDB:', error.message); });

const app = express();
app.use(express.json());

// Configuración del middleware de autenticación
const autenticacion = auth({
  audience: OAUTH_AUDIENCE,
  issuerBaseURL: OAUTH_URL,
  tokenSigningAlg: "RS256",
});

// Importamos el Router de Libros
const librosRouter = require("./routes/libros");

// Configuramos el middleware de autenticación antes de las rutas
app.use("/api/libros", autenticacion, librosRouter);

// Manejador de errores global
app.use(errorHandler);

// Configuración del puerto
const port = PORT || 3000;

// Manejo del cierre de la conexión a MongoDB
process.on('SIGINT', async () => {
  await mongoose.disconnect();
  
  process.exit(0); });

app.listen(port, () => {
  console.log(`Servidor en ejecución en el puerto ${port}`);
});

module.exports = app;
