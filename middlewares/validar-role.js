const { request, response } = require("express");

const isAdminRole = (req = request, res = response, next) => {

    if(!req.authUser) return res.status(500).json({
        msg: 'Se esta validando el rol sin validar el JWT'
    });

    const { role, name } = req.authUser;

    if(role !== 'ADMIN_ROLE') return res.status(401).json({
        msg: `${name} no es administrador`
    })

    next();
}

const hasRole = (...roles) => {
    return (req = request, res = response, next) => {
        if(!req.authUser) return res.status(500).json({
            msg: 'Se esta validando el rol sin validar el JWT'
        });

        if(!roles.includes(req.authUser.role)) return res.status(401).json({
            msg: `Para esta acción se requiere uno de los siguientes roles ${roles}`
        })
        next()
    }
}

module.exports = {
    isAdminRole,
    hasRole
}