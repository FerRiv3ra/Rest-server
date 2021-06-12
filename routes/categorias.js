const { Router } = require('express');
const { check } = require('express-validator');

const { validarToken, validarCampos, isAdminRole } = require('../middlewares');
const { crearCategoria, obtenerCategorias, obtenerCategoria, editarCategoria, borrarCategoria } = require('../controllers/categorias');
const { validCategoriaExists } = require('../helpers/validations');

const router = Router();

// Obtener todas la categorias
router.get('/', obtenerCategorias);

// Una categoria por ID
router.get('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(validCategoriaExists),
    validarCampos
], obtenerCategoria)

// Crear una nueva categoria
router.post('/', [ 
    validarToken,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearCategoria);

// Editar una categoria
router.put('/:id', [
    validarToken,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(validCategoriaExists),
    check('name', 'El nombre es requerido para editar').notEmpty(),
    validarCampos
], editarCategoria)

// Borrar una categoria
router.delete('/:id', [
    validarToken,
    isAdminRole,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(validCategoriaExists),
    validarCampos
], borrarCategoria)

module.exports = router;