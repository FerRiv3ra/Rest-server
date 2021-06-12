const validaCampos = require('./validar-campos');
const validaToken = require('./validar-token');
const validaRoles = require('./validar-role');
const validarArchivo = require('./validar-archivo');

module.exports = {
    ...validaCampos,
    ...validaToken,
    ...validaRoles,
    ...validarArchivo
}