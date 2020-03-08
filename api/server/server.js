require('./config/config');

const express = require('express');
const mongoose = require('mongoose');

const app = express();
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

// configuración rutas
// app.use(require('./routes/usuario'));
// app.use(require('./routes/login'));
// // ....
app.use(require('./routes/index'));

async function conectarBD(){
    await mongoose.connect(process.env.URLDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
    }).catch(error => console.log(error));

    console.log('conexion establecida con BD');
}

conectarBD();



app.listen(process.env.PORT , () => {
    console.log(`Escuchando puerto ${process.env.PORT}`);
})