const cocinerosRouter = require('express').Router();
const Cocinero = require('../models/Cocinero');
const { verifyToken } = require("../utils/middlewares");

//se podria hacer para uqe todo pase por ahi bloquendo
cocinerosRouter.use(verifyToken);

//traer todas
//o pasando el middleware en esa ruta
// cocinerosRouter.get("/", verifyToken, (req, res, next) => {
cocinerosRouter.get("/", (req, res, next) => {
    // console.log("hola" +req.headers);
    Cocinero.find({}).then((cocineros) => {
        res.json(cocineros);
    })
        .catch((err) => {
            next(err);
        })
});

//traer xId
cocinerosRouter.get("/:id", (req, res) => {
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
cocinerosRouter.delete("/:id", (req, res, next) => {
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
            // res.status(400).end();
            next(err);
        })
});

//1:43
//agregar cocinerojson
cocinerosRouter.post("/", (req, res, next) => {
    // no se lee directamente lo quee sta en el cuerpo, hay que suar un middleware
    const { nombre, genero, especialidad, edad, estaEliminado } = req.body;
    const nuevaCocinero = new Cocinero({
        nombre,
        genero,
        especialidad,
        edad,
        estaEliminado
    });

    nuevaCocinero
        .save()
        .then(cocinero => {
            res.json(cocinero);
        })
        .catch(error => {
            next(error);
            // res.status(500).end();
            // res.status(400).send({ error: "Parametros Invalidos" });
        })

});

// put piso, patch nodifica fusionando
//modificar xId
cocinerosRouter.put("/:id", (req, res, next) => {
    const id = req.params.id;
    const { nombre, genero, especialidad, edad, estaEliminado } = req.body;
    const infoCocinero = {};
    //manejamos el dato desde el back, y chequeamos para que no enchufen otras cosas
    if (nombre) {
        infoCocinero.nombre = nombre;
    }
    if (edad) {
        infoCocinero.edad = edad;
    }
    if (genero) {
        infoCocinero.genero = genero;
    }
    if (especialidad) {
        infoCocinero.especialidad = especialidad;
    }
    if (estaEliminado) {
        infoCocinero.estaEliminado = estaEliminado;
    }

    //no queiro que me lo devuelva antes, asi que le paso el new
    Cocinero.findByIdAndUpdate(id, infoCocinero, { new: true })
        .then(cocinero => {
            if (cocinero) {
                res.json(cocinero);
                // console.log(prueba);
            }
            res.status(400).end();
        })
        .catch(error => {
            next(error);
        })
});

module.exports = cocinerosRouter;