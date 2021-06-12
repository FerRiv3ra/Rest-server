
const generarJWT = require('./generar-jwt');
const googleVerify = require('./google-verify');
const subirArchivo = require('./subir-archivo');
const validations = require('./validations');

module.exports = {
    ...generarJWT,
    ...googleVerify,
    ...subirArchivo,
    ...validations,
}