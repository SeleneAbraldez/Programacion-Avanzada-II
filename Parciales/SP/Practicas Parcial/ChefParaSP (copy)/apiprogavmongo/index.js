//sin const porque es algo que pedis que corra, no es algo que necesitas gaiurdar localmente 
//primera linea para que las variables de entorno esten disponibles apra la aplicacion
require('dotenv').config();
require('./db/mongo');

const { PORT } = require("./utils/config.js")
const express = require('express');
const cors = require('cors');
const { handlerNotFound, handleError, logger } = require("./utils/middlewares");
const cocinerosRouter = require('./routes/cocinerosRouter');
const usersRouter = require('./routes/usersRouter');
const loginRouter = require('./routes/loginRouter');

const app = express();

app.use(express.json());

app.use(logger);
app.use(cors());

app.get("/", (req, res) => {
    res.send("<h2>Api Cocineros Mongo<h2>");
});

app.use("/api/login", loginRouter);
app.use("/api/users", usersRouter);
app.use("/api/cocineros", cocinerosRouter);

app.use(handlerNotFound);
app.use(handleError);

app.listen(PORT, () => {
    console.log("Servidor escuchando en puerto: " + PORT);
});