const { response, request } = require('express');

const userGet = (req = request, res = response) => {
    const { id } = req.params;
    const { q, page = 1, limit = 1 } = req.query;
    let { nombre = 'No name' } = req.query;
    nombre = nombre.replace('%', ' ');
    res.json({
        ok: true,
        msg: 'get API - Controller',
        id,
        q,
        nombre,
        page,
        limit
    })
}

const userPost = (req, res = response) => {
    const {id, nombre} = req.body;
    res.json({
        ok: true,
        msg: 'post API - Controller',
        id,
        nombre
    })
}

const userDelete = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'delete API - Controller'
    })
}

const userPatch = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'patch API - Controller'
    })
}

const userPut = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'put API - Controller'
    })
}


module.exports = {
    userGet,
    userPost,
    userDelete,
    userPatch,
    userPut
}