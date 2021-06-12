const { Schema, model } = require('mongoose');

const categoriaSchema = Schema({
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
    }
});

categoriaSchema.methods.toJSON = function(){
    const { __v, state, _id: uid, ...data} = this.toObject();
    return {uid, ...data};
}

module.exports = model('Categoria', categoriaSchema);