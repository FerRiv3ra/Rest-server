const path = require('path');
const fs = require('fs');

const { response } = require("express");
const cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL);

const { subirArchivo } = require("../helpers");
const { User, Producto } = require("../models");

const cargarArchivo = async (req, res = response) => {
    try {
      // const fileName = await subirArchivo(req.files, ['png', 'jpg', 'jpeg', 'gif'], 'files') 
      const fileName = await subirArchivo(req.files) 
      res.json({fileName});
    } catch (msg) {
      res.status(400).json({
        msg: msg
      })
    }
}

const updateImg = async (req, res = response) => {
  const { colection, id } = req.params;

  let model;
  switch (colection) {
    case 'users':
      model = await User.findById(id);
      if(!model){
        res.status(400).json({
          msg: `No existe un usuario con el ID ${id}`
        });
      }
    break;
    case 'productos':
      model = await Producto.findById(id);
      if(!model){
        res.status(400).json({
          msg: `No existe un producto con el ID ${id}`
        });
      }
      break;
    default:
      res.status(500).json({
        msg: 'Se me olvidó tomar en cuenta este caso'
      });
      break;
  }

  try {
    if(model.img){
      const pathImg = path.join(__dirname, '../uploads', colection, model.img);
      if(fs.existsSync(pathImg)){
        fs.unlinkSync(pathImg);
      }
    }

    model.img = await subirArchivo(req.files, undefined, colection);
    await model.save();

    res.json({
      model
    });
  } catch (msg) {
    res.status(400).json({msg})
  }
}

const updateImgCloudinary = async (req, res = response) => {
  const { colection, id } = req.params;

  let model;
  switch (colection) {
    case 'users':
      model = await User.findById(id);
      if(!model){
        res.status(400).json({
          msg: `No existe un usuario con el ID ${id}`
        });
      }
    break;
    case 'productos':
      model = await Producto.findById(id);
      if(!model){
        res.status(400).json({
          msg: `No existe un producto con el ID ${id}`
        });
      }
      break;
    default:
      res.status(500).json({
        msg: 'Se me olvidó tomar en cuenta este caso'
      });
      break;
  }

  try {
    const { tempFilePath } = req.files.file;
    if(model.img){
      const urlArr = model.img.split('/');
      const imgName = urlArr[urlArr.length - 1];
      const [ public_id ] = imgName.split('.');
      cloudinary.uploader.destroy(public_id);
    }

    const { secure_url } = await cloudinary.uploader.upload( tempFilePath );
    model.img = secure_url;
    await model.save();

    res.json({
      model
    });
  } catch (msg) {
    res.status(400).json({msg})
  }
}

const showImg = async (req, res = response) => {
  const { colection, id } = req.params;

  let model;
  switch (colection) {
    case 'users':
      model = await User.findById(id);
      if(!model){
        res.status(400).json({
          msg: `No existe un usuario con el ID ${id}`
        });
      }
    break;
    case 'productos':
      model = await Producto.findById(id);
      if(!model){
        res.status(400).json({
          msg: `No existe un producto con el ID ${id}`
        });
      }
      break;
    default:
      res.status(500).json({
        msg: 'Se me olvidó tomar en cuenta este caso'
      });
      break;
  }

  try {
    if(model.img){
      const pathImg = path.join(__dirname, '../uploads', colection, model.img);
      if(fs.existsSync(pathImg)){
        return res.sendFile(pathImg);
      }
    }

    const noImagePath = path.join(__dirname, '../assets/no-image.jpg');
    res.sendFile(noImagePath);
  } catch (msg) {
    res.status(400).json({msg})
  }
}

module.exports = {
    cargarArchivo,
    updateImg,
    showImg,
    updateImgCloudinary
}