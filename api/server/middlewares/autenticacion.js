// Verificar Token

const jwt = require('jsonwebtoken');


// obtiene información de los headers para valirdar el token
let verificarToken = (req, res, next) => {
    let token = req.get('token'); // token del header

    jwt.verify(token, process.env.TOKEN_SEED, (err, decoded) => {

            if(err){
                return res.status(401).json({
                    ok:false,
                    err : {
                        message: "Token no válido: " + err
                    }
                })
            }

            req.usuario = decoded.usuario; 

            next();
    });

}

module.exports = {
    verificarToken
}