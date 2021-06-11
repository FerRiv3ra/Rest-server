const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos, validarToken, isAdminRole, hasRole } = require('../middlewares');

const { userGet, userPost, userDelete, userPut } = require('../controllers/user');
const { validRole, validEmail, validUserById } = require('../helpers/validations');

const router = Router();

router.get('/', userGet);
router.post('/', [
    check('name', 'El nombre es requerido').not().isEmpty(),
    check('email', 'Correo no válido').isEmail(),
    check('email').custom(validEmail),
    check('password', 'La contraseña dede tener al menos 6 caracteres').isLength({min: 6}),
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
    validarToken,
    // isAdminRole,
    hasRole('ADMIN_ROLE', 'VENTAS_ROLE'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(validUserById),
    validarCampos
], userDelete);

module.exports = router;