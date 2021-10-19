const mongoose = require('mongoose');
const { model, Schema } = mongoose;

//lam,ando a los cmapos me construye un nuevo esquema
const userSchema = new Schema({
    username:{
        type: String,
        required: true
    },
    passwordHash: {
        type: String,
        required: true,
    },
});

// sirve para transformar una el _V que viene como control de versiones de mongo
userSchema.set('toJSON', {
    transform: ((document, userToJSON) => {
        userToJSON.id = userToJSON._id.toString();
        delete userToJSON._id;
        delete userToJSON.__v;
        delete userToJSON.passwordHash;
    })
})

module.exports = model('User', userSchema);