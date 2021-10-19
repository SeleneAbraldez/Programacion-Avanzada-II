const mongoose = require('mongoose');
const { model, Schema } = mongoose;

//lam,ando a los cmapos me construye un nuevo esquema
const cocineroSchema = new Schema({
    nombre:{
        type: String,
        required: true
    },
    edad: {
        type: Number,
        required: true,
        min: 18,
        max: 65
    },
    genero:{
        type: String,
        required: true
    },
    especialidad: {
        type: String,
        required: true
    }, 
    cantEpisodios: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },
    estaEliminado: {
        type: Boolean,
        required: true
    }
});

// sirve para transformar una el _V que viene como control de versiones de mongo
cocineroSchema.set('toJSON', {
    transform: ((document, cocineroToJSON) => {
        cocineroToJSON.id = cocineroToJSON._id.toString();
        delete cocineroToJSON._id;
        delete cocineroToJSON.__v;

    })
})

//y luego hay que llamar al modelo
//regla de mongoose, en minuscula, ya que cuando llama a la coleccion lo llama con mayusculas o s al final
//para algunas tranforma person -> people
const Cocinero = model('Cocinero', cocineroSchema);

module.exports = Cocinero;