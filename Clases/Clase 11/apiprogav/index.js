// const Math = require('./matyh');
// console.log(Math.sumar(3,4));

// const http = require("http");
// const port = 3000;

// const app = http.createServer((req, res)=>{

//     res.writeHead(200, {"Content-Type": "text/plain"});
//     // bajar servidor para cada vez
//     // res.writeHead(200, {"Content-Type": "text/html"});
//     res.write("Hola Mundo");
//     // res.write("<h1>Hola Mundo</h1>");
//     res.end();

// })

// app.listen(port);
// console.log("Listening" + port);

const express = require('express');
const cors = require('cors');
const shortid = require('shortid');
const { uuid } = require('uuidv4');
const { handlerNotFound } = require("./middlewares");

const port = 3000;
const app = express();


const logger = (req, res, next)=>{
    console.log(`Hay ${personas.length} personas en la lista`);
    return next();
}

const personas = [
    { id: 0, nombre: "Juan", edad: 30 },
    { id: 1, nombre: "Sele", edad: 20 },
    { id: 2, nombre: "Juana", edad: 23 },
    { id: 3, nombre: "Marcela", edad: 36 },
]

app.use(express.json());

app.use(logger);

app.use(cors);

app.get("/", (req, res) => {
    res.send("<h2>Hellooooo world<h2>");
});

app.get("/api/personas", (req, res) => {
    res.json(personas);
});

app.get("/api/personas/:id", (req, res) => {
    //hay que convertir a numero porque el texto plano nunca va a poder matchear en el find
    const id = req.params.id;
    // res.json(personas[id]);
    const persona = personas.find((p) => p.id == id);
    // res.json(persona);
    persona ? res.json(persona) : res.status(404).end();
    // console.log(persona);
});

app.delete("/api/personas/:id", (req, res) => {
    // mongo al semana que viene no hacerlo a mano, hoy va a ser a mano
    const id = req.params.i;
    const indice = personas.findIndex(p => p.id == id);
    if (indice != -1) {
        // no hay que hacerlo con find, conceptualemntre esta mal
        personas.splice(id, 1);
        //ok sin devolver contenido
        res.status(204).end();
    }
    res.status(404).end();
});

app.post("/api/personas", (req, res) => {
    // no se lee directamente lo quee sta en el cuerpo, hay que suar un middleware
    const {nombre, edad} = req.body;
    if (nombre && edad) {
        const newPerson = {
            id: shortid.generate(),
            nombre,
            edad,
        }
        personas.push(newPerson);
        res.status(201).json(newPerson);
    }
    res.status(404).end();
});

app.put("/api/personas/:id", (req, res) => {
    const id = req.params.id;
    // put piso, patch nodifica fusionando
    const dataNueva = req.body;
    const persona = personas.find((p) => p.id == id);
    if(persona){
        for (const key in dataNueva) {
            if (Object.hasOwnProperty.call(persona, key)) {
                persona[key] = dataNueva[key];                
            }
        }
        res.status(200).json(persona);
    }
    res.status(400).end();
});

app.use(handlerNotFound);


app.listen(port, () => {
    console.log("Listening" + port);
});