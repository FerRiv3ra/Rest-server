const express = require('express');
const cors = require('cors');

class Server{
    port = process.env.PORT;
    constructor(){
        this.app = express();
        this.endPoint = '/api/users';

        // Midlewares
        this.midlewares();

        // Rutas
        this.routes();
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