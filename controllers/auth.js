const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/generar-jwt');
const { googleVerify } = require('../helpers/google-verify');

const login = async (req, res = response) => {

    const { email, password } = req.body;

    try {
        // Verificar si el correo existe
        const user = await Usuario.findOne({email});
        if(!user) return res.status(400).json({msg: 'Usuario o contraseña incorrecto'});

        // Verificar si esta activo
        if(!user.state) return res.json({msg: 'El usuario no esta activo'});

        // Verificar contraseña
        const validPass = bcryptjs.compareSync(password, user.password);
        if(!validPass) return res.status(400).json({msg: 'Usuario o contraseña incorrecto'});

        // Generar JWT
        const token = await generarJWT(user._id);

        res.json({
            user,
            token
        });
    } catch (error) {
        console.status(500).log(error);
        res.json({
            msg: 'Algo salió mal, hable con el administrador'
        });
    }
}

const googleSignIn = async (req = request, res = response) => {
    const { id_token } = req.body;

    try {
        const { name, img, email }  = await googleVerify(id_token);

        let user = await Usuario.findOne({ email });

        // Verificar si el usuario existe en DB sino crearlo
        if(!user){
            const data = {
                name,
                email,
                password: ':P',
                img,
                google: true
            }

            user = new Usuario(data);
            await user.save();
        }

        // Verificar el estado del usuario de Google
        if(!user.state){
            return res.status(401).json({
                msg: 'Usuario bloqueado - Hable con el administrador'
            })
        }

        // Generar JWT
        const token = await generarJWT(user._id);

        res.json({
            user,
            token
        })
    } catch (err) {
        res.status(400).json({
            msg: 'Token de Google no válido'
        })
    }

}

module.exports = {
    login,
    googleSignIn
}