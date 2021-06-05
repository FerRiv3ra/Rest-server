const Role = require('../models/role');
const User = require('../models/usuario');

const validRole = async (role = '') => {
    // Validar que se ingrese un rol válido
    const existRole = await Role.findOne({role});
    if(!existRole) throw new Error(`El rol ${role} no esta registrado en la DB`);
}

const validEmail = async (email = '') => {
    // Validar que el correo no este registrado
    const existEmail = await User.findOne({email});
    if(existEmail) throw new Error(`El correo ${email} ya se encuentra registrado`);
}

const validUserById = async ( id ) => {
    // Validar que el correo no este registrado
    const exisUserById = await User.findById(id);
    if(!exisUserById) throw new Error(`El ID ${id} no existe`);
}

module.exports = {
    validRole,
    validEmail,
    validUserById
}