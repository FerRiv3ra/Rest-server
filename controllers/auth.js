const { response } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/generar-jwt');

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

module.exports = {
    login
}