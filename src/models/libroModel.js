const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.MONGO_DB, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

const LibroSchema = new mongoose.Schema({
  titulo: String,
  autor: String
}, { collection: 'libros' });

const Libro = mongoose.model('Libro', LibroSchema);

module.exports = Libro;

// Este bloque de código ya importa 'mongoose' y establece la conexión, por lo que no es necesario repetirlo
// const mongoose = require('mongoose');
// require('dotenv').config();

beforeAll(async () => {
  // Conectar a la base de datos antes de que comiencen las pruebas
  await mongoose.connect(process.env.MONGO_DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
});

afterAll(async () => {
  // Cerrar la conexión a la base de datos después de que todas las pruebas hayan finalizado
  await mongoose.disconnect();
});
