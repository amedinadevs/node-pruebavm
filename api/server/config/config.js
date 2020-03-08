// PUERTO
process.env.PORT = process.env.PORT || 3000;

// ENTORNO
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// TOKEN
process.env.TOKEN_CADUCIDAD = '48h'; 
process.env.TOKEN_SEED = process.env.TOKEN_SEED || 'secret-token';

// CONEXION BD - MONGODB ATLAS
let urlDB = 'mongodb+srv://amedinadevs:IgrSnyOR0efNh0qB@cluster0-i7pp7.mongodb.net/prueba-vm';

// CONEXION BD - LOCALHOST
//let urlDB = 'mongodb://localhost:27017/prueba-vm';

process.env.URLDB = urlDB;