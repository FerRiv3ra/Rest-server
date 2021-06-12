const { Router } = require('express');
const { check } = require('express-validator');
const { cargarArchivo, updateImg, showImg, updateImgCloudinary } = require('../controllers/uploads');
const { permitCategory } = require('../helpers');
const { validarCampos, validarArchivo } = require('../middlewares');

const router = Router();

router.post('/', validarArchivo, cargarArchivo);

router.put('/:colection/:id', [
    validarArchivo,
    check('id', 'El ID es requerido').notEmpty(),
    check('id', 'No es un ID válido').isMongoId(),
    check('colection').custom((c) => permitCategory(c, ['users', 'productos'])),
    validarCampos
], updateImgCloudinary);
// ], updateImg); // FileSystem

router.get('/:colection/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('colection').custom((c) => permitCategory(c, ['users', 'productos'])),
    validarCampos
], showImg);


module.exports = router;