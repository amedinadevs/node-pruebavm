const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');
const app = express();

app.post('/login',(req,res)=>{

    let body = req.body;
    Usuario.findOne({email: body.email}, (err, usuarioBD)=>{
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if(!usuarioBD){
            return res.status(401).json({
                ok: false,
                err: {message: 'Usuario incorrecto'}
            });
        }
        if(!bcrypt.compareSync(body.password, usuarioBD.password)){
            return res.status(401).json({
                ok: false,
                err: {message: 'Contraseña incorrecta'}
            });
        }

        var token = jwt.sign(
            {usuario: usuarioBD}, 
            process.env.TOKEN_SEED,
            {expiresIn:process.env.TOKEN_CADUCIDAD}
        );

        res.json({
            ok: true,
            usuario: usuarioBD,
            token: token
        })
    })

})



module.exports = app;