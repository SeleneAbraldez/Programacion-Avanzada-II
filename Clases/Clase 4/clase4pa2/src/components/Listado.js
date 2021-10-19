import React, { Component } from 'react';
import Estacion from "./Estacion";
// import uuid from "uuid/v4";

const { v4: uuidv4 } = require('uuid');

class Listado extends Component {
    constructor(props) {
        super(props);
        this.state = {
            estaciones: ["Verano", "Otoño", "Infvierno", "Primavera"],
        };
    }
    render() {
        return (
            <>
                <h1>Estaciones del año</h1>
                <ol>
                    {
                        this.state.estaciones.map((estacion) => (
                            //no hay que 0pasa por dentro, si no que psar key
                            <Estacion key={uuidv4()} nombre={estacion} />
                        ))
                    }
                </ol>
            </>
        );
    }
}

export default Listado;