const loginRouter = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SECRET } = require("../utils/config");

loginRouter.post("/", async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        const okPassFlag =
            user === null ? false : await bcrypt.compare(password, user.passwordHash);
        if (!(user && okPassFlag)) {
            return next({ name: "ValidationError", message: "Datos no validos" })
        }

        const userToken = {
            username: user.username,
            id: user._id,
        }
        const token = await jwt.sign(userToken, SECRET, {expiresIn: "120s"});

        res.status(200).json(token, username);

    } catch (error) {
        next(error);
    }
})

module.exports = loginRouter;