const { validationResult } = require("express-validator");

const validarCampos = (req, res, next) => {
    // Capturar errores si los hay
    const errors = validationResult(req);

    // Si hay errores mostrarlos
    if(!errors.isEmpty()) return res.status(400).json(errors);

    // Ejecuta el siguiente middleware
    next();
}

module.exports = {
    validarCampos
}