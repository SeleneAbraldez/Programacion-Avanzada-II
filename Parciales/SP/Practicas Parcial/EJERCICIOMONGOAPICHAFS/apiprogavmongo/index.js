//sin const porque es algo que pedis que corra, no es algo que necesitas gaiurdar localmente 
//primera linea para que las variables de entorno esten disponibles apra la aplicacion
require('dotenv').config();
require('./mongo');

const express = require('express');
const cors = require('cors');
const Cocinero = require('./models/Cocinero');
const { handlerNotFound } = require("./middlewares");

const port = process.env.port || 5000;
//port=4000 npm run dev
//process.argv[]

const app = express();

const logger = (req, res, next) => {
    // console.log(`Hay ${cocinero.length} cocinero en la lista`);
    return next();
}

app.use(express.json());

app.use(logger);
app.use(cors());

app.get("/", (req, res) => {
    res.send("<h2>Api Cocinero Mongo<h2>");
});

//traer todas
app.get("/api/cocineros", (req, res, next) => {
    Cocinero.find({}).then((cocinero) => {
        res.json(cocinero);
    })
        .catch((err) => {
            next(err);
        })
});

//traer xId
app.get("/api/cocineros", (req, res) => {
    const id = req.params.id;

    Cocinero.findById(id).then(cocinero => {
        if (cocinero) {
            res.json(cocinero);
        }
        res.status(404).end();
    })
        .catch(error => {
            res.status(400).send({ error: "ID Invalida" });
        })
});

//borar xid
app.delete("/api/cocineros/:id", (req, res) => {
    // mongo al semana que viene no hacerlo a mano, hoy va a ser a mano
    const id = req.params.id;

    Cocinero.findByIdAndRemove(id)
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
//agregar cocinerojson
app.post("/api/cocineros", (req, res) => {
    // no se lee directamente lo quee sta en el cuerpo, hay que suar un middleware
    const { nombre, especialidad, edad, estaEliminado } = req.body;
    if (nombre && edad && especialidad && estaEliminado) {
        const nuevaCocinero = new Cocinero({
            nombre,
            especialidad,
            edad,
            estaEliminado
        });

        nuevaCocinero.save()
            .then(cocinero => {
                res.json(cocinero);
            })
            .catch(error => {
                res.status(500).end();
            })
    }
    else {
        res.status(400).send({ error: "Parametros Invalidos" });
    }
});

//REVISAR
// put piso, patch nodifica fusionando
//modificar xId
// app.put("/api/cocineros/:id", (req, res, next) => {
//     const id = req.params.id;
//     const dataNueva = req.body;
//     const { nombre, especialidad, edad, estaEliminado } = req.body;
//     const infoCocinero = {};
//     //manejamos el dato desde el back
//     if (nombre) {
//         infoCocinero.nombre = nombre;
//     }
//     if (especialidad) {
//         infoCocinero.especialidad = especialidad;
//     }
//     if (edad) {
//         infoCocinero.edad = edad;
//     }
//     if (estaEliminado) {
//         infoCocinero.estaEliminado = estaEliminado;
//     }

//     //no queiro que me lo devuelva antes, asi que le paso el new
//     Cocinero.findByIdAndUpdate(id, infoCocinero, { new: true })
//         .then(cocinero => {
//             if (cocinero) {
//                 res.json(cocinero);
//             }
//             res.status(400).end();
//         })
//         .catch(error => {

//         })

// });

//COFDIGO DE LUCHO; REPENSAR
app.put("/api/cocineros/:id", (req, res, next) => {
    const id = req.params.id;
    const { nombre, especialidad, edad, favorito } = req.body;
    if (!nombre || !edad || !especialidad || !favorito) res.status(400).send({ error: "ERROR: Faltan campos del cocinero." }).end();
    const infoCocinero = { nombre, especialidad, edad, favorito };

    // el new:true es para que me devuelva el objeto actualizado
    Cocinero.findByIdAndUpdate(id, infoCocinero, { new: true }).then(cocinero => {
        if (nombre) {
            infoCocinero.nombre = nombre;
        }
        if (especialidad) {
            infoCocinero.especialidad = especialidad;
        }
        if (edad) {
            infoCocinero.edad = edad;
        }
        if (estaEliminado) {
            infoCocinero.estaEliminado = favorito;
        }
        res.json(cocinero);
        res.status(400).end();
    })
        .catch(error => {
            next(error);
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