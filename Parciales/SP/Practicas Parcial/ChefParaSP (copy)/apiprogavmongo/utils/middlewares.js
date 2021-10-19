const jwt = require('jsonwebtoken');
const { SECRET } = require("../utils/config");

const handlerNotFound = (req, res) => {
    res.status(404).json({
        error: "No existe ese recurso"
    });
};

const handleError = (err, req, res, next) => {
    console.log(err.name);
    if (err.name == "CastError") {
        res.status(400).send({ error: "Oh no! Bad ID" })
    } else if (err.name == "SyntaxError") {
        res.status(400).send({ error: "Oh no! Syntax Error" })

    } else if (err.name == "ReferenceError") {
        res.status(400).send({ error: err.name, message: err.message })

    } else if (err.name == "ValidationError") {
        res.status(400).send({ error: err.name, message: err.message })

    } else if (err.name == "ErrorToken") {
        res.status(401).send({ error: err.name, message: err.message })

    } else if (err.name == "JsonWebTokenError") {
        res.status(403).send({ error: err.name, message: err.message })

    } else if (err.name == "TokenExpiredError") {
        res.status(401).send({ error: err.name, message: err.message })

    } else {
        res.status(500).send({ error: "Oh no! Internal Server Error" })
    }
    next();
};



const logger = (req, res, next) => {
    // console.log(`Hay ${personas.length} personas en la lista`);
    //uno podria hacer un log de toda la actividad con todas las peticiones, enbinario por ejemplo apra matener 
    console.log(req.path);
    console.log(req.method);
    next();
}

const verifyToken = async (req, res, next) => {
    const bearerToken = req.headers['authorization'];
    if (typeof bearerToken !== 'undefined') {
        req.token = bearerToken.split(" ")[1];
        try {
            const data = await jwt.verify(req.token, SECRET);
            console.log(data);
            next();
        } catch (error) {
            next(error);
        }
    } else {
        next({ name: "ErrorToken", message: "Error! No hay token" });
    }
}

module.exports = {
    handleError,
    handlerNotFound,
    logger,
    verifyToken,
}
// exports.handlerNotFound = handlerNotFound;