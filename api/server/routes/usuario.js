const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore')
const Usuario = require('../models/usuario');
const {verificarToken} = require('../middlewares/autenticacion');
const app = express();

/**
 * @description Lista los usuarios de forma paginada. Fuera del alcance de la prueba ;-)
 */
app.get('/usuario', verificarToken, (req, res) => {

    let desde = req.query.desde || 0;
    let limite = req.query.limite || 5;

    Usuario.find({estado: true}, 'nombre apellidos email pais telefono cp')
        .skip(Number(desde))
        .limit(Number(limite))
        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            Usuario.count({estado: true}, (err, cuenta) => {

                res.json({
                    ok: true,
                    usuarios,
                    cuantos: cuenta
                });

            });

            
        })
})

/**
 * @description ALTA de USUARIO - Sin autentificación
 */
app.post('/usuario', (req, res) => {

    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        apellidos: body.apellidos,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        pais: body.pais,
        telefono: body.telefono,
        cp: body.cp
    });

    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        usuarioDB.password = null;

        res.json({
            ok: true,
            persona: usuarioDB
        })
    });
})

/**
 * @description MODIFICACION usuario - Requiere autentificación
 */
app.put('/usuario/:id', verificarToken, (req, res) => {
    let id = req.params.id;
    
    Usuario.findById(id, (err, usuarioDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if(!usuarioDB){
            return res.status(404).json({
                ok: false,
                err: {
                    message: "Usuario no encontrado"
                }
            });
        }

        if(!bcrypt.compareSync(req.body.password,usuarioDB.password)){
            return res.status(401).json({
                ok: false,
                err: {
                    message: "Contraseña incorrecta"
                }
            });
        }

        req.body.password = bcrypt.hashSync(req.body.password_new, 10);
 
        let body = _.pick(req.body, ['nombre', 'apellidos','password', 'email', 'pais', 'telefono', 'cp' ]); // los campos que se tienen que actualizar

        Usuario.findByIdAndRemove(id);
        usuarioDB.overwrite(body)
        usuarioDB.save();

        res.json({
            ok: true,
            usuario: usuarioDB
        })

    });    
})

/**
 * @description DELETE - Se elimina el registro por completo de la base de datos.
 */
app.delete('/usuario/:id', verificarToken, (req, res) => {
    let id = req.params.id;

    Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (!usuarioBorrado) {
            return res.status(404).json({
                ok: false,
                err: {
                    message: "Usuario no encontrado"
                }
            });
        }

        res.json({
            ok: true,
            usuario: usuarioBorrado
        })
    })
})


/**
 * @description DELETE (UPDATE estado = false)- No elimina el registro, solo le cambia el flag estado=false para que no aparezca. Otro tipo de borrado más actual ;-)
 */
app.delete('/usuario/remove/:id',verificarToken, (req, res) => {
    let id = req.params.id;
    // NOTA: tambien se puede hacer con findByIdAndUpdate pasando en vez de body un objeto {estado: false}

    Usuario.findById(id, (err, usuarioDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if(!usuarioDB){
            return res.status(404).json({
                ok: false,
                err: {
                    message: "Usuario no encontrado"
                }
            });
        }

        usuarioDB.estado = false;
        usuarioDB.save();

        res.json({
            ok: true,
            usuario: usuarioDB
        })
    });
})

module.exports = app;