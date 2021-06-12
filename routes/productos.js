const { Router } = require('express');
const { check } = require('express-validator');
const { crearProducto, obtenerProductos, obtenerProducto, editarProducto, borrarProducto } = require('../controllers/productos');
const { validProductoExists, validCategoriaExists } = require('../helpers/validations');

const { validarToken, validarCampos, isAdminRole } = require('../middlewares');


const router = Router();

// Obtener todos los productos
router.get('/', obtenerProductos);

// Un producto por ID
router.get('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(validProductoExists),
    validarCampos
], obtenerProducto)

// Crear un nuevo producto
router.post('/', [ 
    validarToken,
    check('category', 'La categoría es obligatoria').notEmpty(),
    check('category', 'El ID de categoría no es válido').isMongoId(),
    check('category').custom(validCategoriaExists),
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearProducto);

// Editar un producto
router.put('/:id', [
    validarToken,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(validProductoExists),
    check('category', 'La categoría es obligatoria').notEmpty(),
    check('category', 'El ID de categoría no es válido').isMongoId(),
    check('category').custom(validCategoriaExists),
    validarCampos
], editarProducto)

// Borrar un producto
router.delete('/:id', [
    validarToken,
    isAdminRole,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(validProductoExists),
    validarCampos
], borrarProducto)

module.exports = router;