const personasRouter = require('express').Router();
const Persona = require('../models/Persona');
const { verifyToken } = require("./")

//traer todas
personasRouter.get("/", (req, res, next) => {
    Persona.find({}).then((personas) => {
        res.json(personas);
    })
        .catch((err) => {
            next(err);
        })
});

//traer xId
personasRouter.get("/", (req, res) => {
    const id = req.params.id;

    Persona.findById(id).then(persona => {
        if (persona) {
            res.json(persona);
        }
        res.status(404).end();
    })
        .catch(error => {
            res.status(400).send({ error: "ID Invalida" });
        })
});

//borar xid
personasRouter.delete("/:id", (req, res) => {
    // mongo al semana que viene no hacerlo a mano, hoy va a ser a mano
    const id = req.params.id;

    Persona.findByIdAndRemove(id)
        .then(result => {
            if (result) {
                res.status(204).end();
            }
            res.status(404).end();
        })
        .catch(err => {
            res.status(400).end();
        })
});

//1:43
//agregar personajson
personasRouter.post("/", (req, res) => {
    // no se lee directamente lo quee sta en el cuerpo, hay que suar un middleware
    const { nombre, edad } = req.body;
    const nuevaPersona = new Persona({
        nombre,
        edad,
    });

    nuevaPersona.save()
        .then(persona => {
            res.json(persona);
        })
        .catch(error => {
            // res.status(500).end();
            next.error();
        })

    res.status(400).send({ error: "Parametros Invalidos" });
});

// put piso, patch nodifica fusionando
//modificar xId
personasRouter.put("/:id", (req, res, next) => {
    const id = req.params.id;
    const dataNueva = req.body;
    const { nombre, edad } = req.body;
    const infoPersona = {};
    //manejamos el dato desde el back
    if (nombre) {
        infoPersona.nombre = nombre;
    }
    if (edad) {
        infoPersona.edad = edad;
    }

    //no queiro que me lo devuelva antes, asi que le paso el new
    Persona.findByIdAndUpdate(id, infoPersona, { new: true })
        .then(person => {
            if (persona) {
                res.json(persona);
            }
            res.status(400).end();
        })
        .catch(error => {

        })

});

module.exports = personasRouter;