const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server{
    port = process.env.PORT;
    constructor(){
        this.app = express();
        this.endPoint = '/api/users';

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
    }

    routes(){
        this.app.use(this.endPoint, require('../routes/user.routes'));
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('App corriendo en el puerto ', this.port)
        })
    }
}

module.exports = Server;