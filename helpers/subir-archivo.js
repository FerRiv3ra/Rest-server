const path = require('path');
const { v4:uuidv4 } = require('uuid');

const subirArchivo = (files, validExtension = ['png', 'jpg', 'jpeg', 'gif'], folder = '') => {
    return new Promise((resolve, reject) => {
        const { file } = files;
        const cutName = file.name.split('.');
        const extension = cutName[cutName.length - 1];
        
        if(!validExtension.includes(extension)){
            return reject(`La extensión ${extension} no es permitida, ${validExtension}`)
        } 
        
        const tempName = uuidv4() + '.' + extension;

        uploadPath = path.join(__dirname, '../uploads/', folder, tempName);

        file.mv(uploadPath, (err) => {
            if (err) {
                return reject(err);
            }
        
            return resolve(tempName);
        });
    })
}

module.exports = {
    subirArchivo
}