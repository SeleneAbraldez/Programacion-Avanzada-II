const mongoose = require('mongoose');
const { model, Schema } = mongoose;

//lam,ando a los cmapos me construye un nuevo esquema
const personaSchema = new Schema({
    nombre: String,
    edad: Number,
});

// sirve para transformar una el _V que viene como control de versiones de mongo
personaSchema.set('toJSON', {
    transform: ((document, personaToJSON) => {

        personaToJSON.id = personaToJSON._id.toString();
        delete personaToJSON._id;
        delete personaToJSON.__v;

    })
})

//y luego hay que llamar al modelo
//regla de mongoose, en minuscula, ya que cuando llama a la coleccion lo llama con mayusculas o s al final
//para algunas tranforma person -> people
const Persona = model('Persona', personaSchema);

module.exports = Persona;