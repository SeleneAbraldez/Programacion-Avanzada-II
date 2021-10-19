const mongoose = require('mongoose');
const { connect } = mongoose;

const conectarBD = async () => {
    //ir al cluster, connect with aplication y nos traemos el connection string
    connect(process.env.DB_URI, {
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