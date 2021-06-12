const { Categoria, User, Producto } = require('../models');
const Role = require('../models/role');

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

const validCategoriaExists = async ( id ) => {
    // Validar que la categoría no este registrada
    const exisCategoiesById = await Categoria.findById(id);
    if(!exisCategoiesById) throw new Error(`El ID ${id} no existe`);
}

const validProductoExists = async ( id ) => {
    // Validar que la categoría no este registrada
    const exisProductoById = await Producto.findById(id);
    if(!exisProductoById) throw new Error(`El ID ${id} no existe`);
}

const permitCategory = (colection = '', colections = []) => {
    if(!colections.includes(colection)){
        throw new Error(`La colección ${colection} no es permitida, ${colections}`)
    }

    return true;
}

module.exports = {
    validRole,
    validEmail,
    validUserById,
    validCategoriaExists,
    validProductoExists,
    permitCategory
}