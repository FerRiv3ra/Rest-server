const { request, response } = require("express");
const { Categoria } = require('../models');

const crearCategoria = async (req = request, res = response) => {
    const name = req.body.name.toUpperCase();

    const categoriaDB = await Categoria.findOne({name});

    if(categoriaDB){
        return res.status(400).json({
            msg: `La categoría ${categoriaDB.name} ya existe`
        })
    }

    const data = {
        name,
        user: req.authUser._id
    }

    const categoria = new Categoria(data);
    await categoria.save();

    res.status(201).json(categoria);
}

const obtenerCategorias = async (req = request, res = response) => {
    const { start = 0, limit = 5 } = req.query;
    const query = {state: true};
    const [ total, categorias ] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query).populate('user', 'name').skip(Number(start)).limit(Number(limit))
    ]);

    res.json({
        total,
        categorias
    })
}

const obtenerCategoria = async (req = request, res = response) => {
    const { id } = req.params;
    const categoria = await Categoria.findById(id).populate('user', 'name');
    res.status(200).json({
        categoria
    })
}

const editarCategoria = async (req = request, res = response) => {
    const { id } = req.params;
    const name = req.body.name.toUpperCase();
    const existCategoria = await Categoria.findOne({name});

    if(existCategoria) return res.status(400).json({
        msg: `Ya existe la categoría ${existCategoria.name}`
    });

    const data = {
        name,
        user: req.authUser._id
    }
    const categoria = await Categoria.findByIdAndUpdate(id, data, {new: true});
    res.status(200).json({
        categoria
    })
}

const borrarCategoria = async (req = request, res = response) => {
    const { id } = req.params;
    const categoria = await Categoria.findByIdAndUpdate(id, {state: false}, {new: true});
    res.status(200).json({
        categoria
    })
}

module.exports = {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    editarCategoria,
    borrarCategoria
}