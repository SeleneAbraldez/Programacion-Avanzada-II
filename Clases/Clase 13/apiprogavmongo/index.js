//sin const porque es algo que pedis que corra, no es algo que necesitas gaiurdar localmente 
//primera linea para que las variables de entorno esten disponibles apra la aplicacion
require('./db/mongo');

const { PORT } = require("./utils/config.js")
const express = require('express');
const cors = require('cors');
// const app = express();
const { handlerNotFound, handleError, logger } = require("./utils/middlewares");
const personasRouter = require('./routes/personasRouter');
const usersRouter = require('./routes/usersRouter');
const loginRouter = require('./routes/loginRouter');

//port=4000 npm run dev
//process.argv[]

const app = express();

app.use(express.json());

app.use(logger);
app.use(cors());

app.get("/", (req, res) => {
    res.send("<h2>Api Personas Mongo<h2>");
});

app.use("/api/login", loginRouter);
app.use("/api/users", usersRouter);
app.use("/api/personas", personasRouter);

app.use(handlerNotFound);
app.use(handleError);

app.listen(PORT, () => {
    console.log("Servidor escuchando en puerto: " + PORT);
});