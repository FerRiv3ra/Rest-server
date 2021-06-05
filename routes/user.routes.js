const { Router } = require('express');
const { check } = require('express-validator');
const { userGet, userPost, userDelete, userPatch, userPut } = require('../controllers/user');
const { validRole, validEmail, validUserById } = require('../helpers/validations');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.get('/', userGet);
router.post('/', [
    check('name', 'El nombre es requerido').not().isEmpty(),
    check('email', 'Correo no válido').isEmail(),
    check('email').custom(validEmail),
    check('password', 'CLa contraseña dede tener al menos 6 caracteres').isLength({min: 6}),
    // check('role', 'Rol no válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('role').custom(validRole),
    validarCampos
], userPost);
router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(validUserById),
    check('role').custom(validRole),
    validarCampos
], userPut);
router.delete('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(validUserById),
    validarCampos
], userDelete);

module.exports = router;