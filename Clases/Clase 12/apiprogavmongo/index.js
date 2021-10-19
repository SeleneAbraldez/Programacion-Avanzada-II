//sin const porque es algo que pedis que corra, no es algo que necesitas gaiurdar localmente 
//primera linea para que las variables de entorno esten disponibles apra la aplicacion
require('dotenv').config();
require('./mongo');

const express = require('express');
const cors = require('cors');
const Persona = require('./models/Persona');
// const app = express();
const { handlerNotFound } = require("./middlewares");

const port = process.env.port || 3000;
//port=4000 npm run dev
//process.argv[]

const app = express();

const logger = (req, res, next) => {
    // console.log(`Hay ${personas.length} personas en la lista`);
    return next();
}

app.use(express.json());

// app.use(logger);
// app.use(cors);

app.get("/", (req, res) => {
    res.send("<h2>Api Personas Mongo<h2>");
});

//traer todas
app.get("/api/personas", (req, res, next) => {
    Persona.find({}).then((personas) => {
        res.json(personas);
    })
        .catch((err) => {
            next(err);
        })
});

//traer xId
app.get("/api/personas", (req, res) => {
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
app.delete("/api/personas/:id", (req, res) => {
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
app.post("/api/personas", (req, res) => {
    // no se lee directamente lo quee sta en el cuerpo, hay que suar un middleware
    const { nombre, edad } = req.body;
    if (nombre && edad) {
        const nuevaPersona = new Persona({
            nombre,
            edad,
        });

        nuevaPersona.save()
            .then(persona => {
                res.json(persona);
            })
            .catch(error => {
                res.status(500).end();
            })
    }
    else {
        res.status(400).send({ error: "Parametros Invalidos" });
    }
});

// put piso, patch nodifica fusionando
//modificar xId
app.put("/api/personas/:id", (req, res, next) => {
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

app.use(handlerNotFound);

app.use((err, req, res, next) => {
    console.log(err.name);
    if (err.name == "CastError") {
        res.status(400).send({ error: "Oh no! Bad ID" })
    } else if (err.name == "SyntaxError") {
        res.status(400).send({ error: "Oh no! Syntax Error" })

    } else {
        res.status(500).send({ error: "Oh no! Internal Server Error" })
    }
    next(err);
})

app.listen(port, () => {
    console.log("Servidor escuchando en puerto: " + port);
});