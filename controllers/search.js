const { response } = require("express");
const { isValidObjectId } = require('mongoose');
const { User, Categoria, Producto } = require("../models");

const colections = [
    'users',
    'productos',
    'categorias',
    'roles'
];

const buscarUsuarios = async (term, res = response) => {
    const esMongoId = isValidObjectId(term);

    if(esMongoId){
        const user = await User.findById(term);
        return res.json({
            results: (user) ? [user] : []
        })
    }

    const expReg = new RegExp(term, 'i');
    const [total, results] = await Promise.all(
        [User.countDocuments({
            $or: [{name: expReg}, {email: expReg}],
            $and: [{state: true}]
        }),
        User.find({
            $or: [{name: expReg}, {email: expReg}],
            $and: [{state: true}]
        })
    ]); 

    res.json({total, results})
}

const buscarCategorias = async (term, res = response) => {
    const esMongoId = isValidObjectId(term);

    if(esMongoId){
        const categoria = await Categoria.findById(term);
        return res.json({
            results: (categoria) ? [categoria] : []
        })
    }

    const expReg = new RegExp(term, 'i');
    const [total, results] = await Promise.all(
        [Categoria.countDocuments({name: expReg, state: true}),
        Categoria.find({name: expReg, state: true})
    ]); 

    res.json({total, results})
}

const buscarProductos = async (term, res = response) => {
    const esMongoId = isValidObjectId(term);

    if(esMongoId){
        const productos = await Producto.findById(term).populate('category', 'name');
        return res.json({
            results: (productos) ? [productos] : []
        })
    }

    const expReg = new RegExp(term, 'i');
    const [total, results] = await Promise.all(
        [Producto.countDocuments({name: expReg, state: true}),
        Producto.find({name: expReg, state: true}).populate('category', 'name')
    ]); 

    res.json({total, results})
}

const buscar = (req, res = response) => {
    const {colection, term} = req.params;

    if(!colections.includes(colection)) return res.status(400).json({
        msg: `Las colecciones permitidas son ${colections}`
    })

    switch(colection){
        case 'users':
            buscarUsuarios(term, res);
            break;
        case 'productos':
            buscarProductos(term, res);
            break;
        case 'categorias':
            buscarCategorias(term, res);
            break;
        case 'roles':

            break;
        default:
            res.status(500).json({
                msg: 'Término de busqueda no tomado en cuenta :S'
            })
    }
}

module.exports = {
    buscar
}