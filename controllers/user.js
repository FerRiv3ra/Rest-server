const { response, request } = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/usuario');

const userGet = async (req = request, res = response) => {
    const { start = 0, limit = 5 } = req.query;
    const query = {state: true};
    const [ total, users ] = await Promise.all([
        User.countDocuments(query),
        User.find(query).skip(Number(start)).limit(Number(limit))
    ])

    res.json({
        total,
        users
    })
}

const userPost = async (req = request, res = response) => {
    // Crear la instancia del usuario con la información obligatoria
    const { name, email, password, role } = req.body;
    const user = new User({ name, email, password, role });

    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    await user.save();
    res.json({
        user
    })
}

const userDelete = async (req = request, res = response) => {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, {state: false});
    res.json({user});
}

// const userPatch = (req = request, res = response) => {
//     res.json({
//         id,
//         msg: 'patch API - Controller'
//     })
// }

const userPut = async(req = request, res = response) => {
    const { id } = req.params;
    const { _id, password, google, email, ...resto} = req.body;

    if(password){
        const salt = bcrypt.genSaltSync();
        resto.password = bcrypt.hashSync(password, salt);
    }

    const user = await User.findByIdAndUpdate(id, resto);

    res.json({
        ok: true,
        user
    })
}


module.exports = {
    userGet,
    userPost,
    userDelete,
    userPut
}