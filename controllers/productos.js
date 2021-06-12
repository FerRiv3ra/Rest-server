const { response } = require("express");
const { Producto } = require('../models');

const crearProducto = async (req , res = response) => {
    const name = req.body.name.toUpperCase();
    const {category, description, price} = req.body;

    const productoDB = await Producto.findOne({name});

    if(productoDB){
        return res.status(400).json({
            msg: `El producto ${productoDB.name} ya existe`
        });
    }

    const data = {
        name,
        user: req.authUser._id,
        category,
        description,
        price
    }

    const producto = new Producto(data);
    await producto.save();

    res.status(201).json(producto);
}

const obtenerProductos = async ( req , res = response) => {
    const { start = 0, limit = 5 } = req.query;
    const query = {state: true};
    const [ total, productos ] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
            .populate('user', 'name')
            .populate('category', 'name')
            .skip(Number(start)).limit(Number(limit))
    ]);

    res.json({
        total,
        productos
    })
}

const obtenerProducto = async ( req , res = response) => {
    const { id } = req.params;
    const producto = await Producto.findById(id)
        .populate('user', 'name')
        .populate('category', 'name');
    res.status(200).json({
        producto
    })
}

const editarProducto = async ( req, res = response) => {
    const { id } = req.params;

    const existProducto = await Producto.findById(id);

    let {name = existProducto ? existProducto.name : name} = req.body;
    const {category = existProducto ? existProducto.category : category, 
            description = existProducto ? existProducto.description : description, 
            price = existProducto ? existProducto.price : price, 
            avalible = existProducto ? existProducto.avalible : true} = req.body;

    if(name){
        name = name.toUpperCase();
        const productoDB = await Producto.findOne({name});
        console.log(productoDB);
        if(productoDB){
            const _id = productoDB._id.toString();
            if(_id !== id){
                return res.status(400).json({
                    msg: `El producto ${productoDB.name} ya existe`
                });
            }
        }
    }

    const data = {
        name,
        user: req.authUser._id,
        category,
        description,
        avalible,
        price
    }
    const producto = await Producto.findByIdAndUpdate(id, data, {new: true});
    res.status(200).json({
        producto
    })
}

const borrarProducto = async (req, res = response) => {
    const { id } = req.params;
    const producto = await Producto.findByIdAndUpdate(id, {state: false}, {new: true});
    res.status(200).json({
        producto
    })
}

module.exports = {
    crearProducto,
    obtenerProductos,
    obtenerProducto,
    editarProducto,
    borrarProducto
}