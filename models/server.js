const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');
const fileUpload = require('express-fileupload');

class Server{
    port = process.env.PORT;
    constructor(){
        this.app = express();

        this.paths = {
            authPath: '/api/auth',
            categorias: '/api/categorias',
            endPoint: '/api/users',
            productos: '/api/productos',
            search: '/api/search',
            uploads: '/api/uploads',
        }

        //Conexión a la base de datos
        this.conectar();

        // Midlewares
        this.midlewares();

        // Rutas
        this.routes();
    }

    async conectar(){
        await dbConnection();
    }

    midlewares(){
        // CORS
        this.app.use(cors());

        // Leer y parsear el body
        this.app.use(express.json());

        // Directorio público
        this.app.use(express.static('public'));

        // Carga de archivos
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));
    }

    routes(){
        this.app.use(this.paths.authPath, require('../routes/auth'));
        this.app.use(this.paths.categorias, require('../routes/categorias'));
        this.app.use(this.paths.endPoint, require('../routes/user.routes'));
        this.app.use(this.paths.productos, require('../routes/productos'));
        this.app.use(this.paths.search, require('../routes/search'));
        this.app.use(this.paths.uploads, require('../routes/uploads'));
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('App corriendo en el puerto ', this.port)
        })
    }
}

module.exports = Server;