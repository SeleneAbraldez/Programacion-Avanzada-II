const { connect } = require('mongoose');
const { DB_URI } = require("../utils/config.js")

const conectarBD = async () => {
    //ir al cluster, connect with aplication y nos traemos el connection string
    connect(DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    });
};

conectarBD()
    .then(result => {
        console.log("Db Conectada :)");
    })
    .catch(err => {
        consolo.log(err);
    })