const { Schema, model } = require('mongoose');

const ProductoSchema = Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    state: {
        type: Boolean,
        default: true,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    price: {
        type: Number,
        default: 0
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        required: true
    },
    description: {
        type: String
    },
    avalible: {
        type: Boolean, 
        default: true
    },
    img: {type: String}
});

ProductoSchema.methods.toJSON = function(){
    const { __v, state, _id: uid, ...data} = this.toObject();
    return {uid, ...data};
}

module.exports = model('Producto', ProductoSchema);