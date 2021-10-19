import React, { Component } from 'react';
import Saludo from './Saludo';
import PropTypes from 'prop-types';

export default class SaludoDeClase extends Component {

    constructor(props) {
        super(props);
        //mas adelante evremos como desestructurar el constructor
    }

    render() {
        return (
            // ({ mensaje, booleano, array, funcion, componente, objeto }) =
            <p>Hola {this.props.mensaje} 
            {this.props.booleano ? "true" : "false"} 
            {this.props.array.map(this.props.funcion)} 
            {this.props.componente} 
            {this.props.objeto.nombre}</p>

        )
    }
}

SaludoDeClase.defaultProps = {
    mensaje: "Nadie"
}

Saludo.prototype = {
//avisa pro consola, funciona igual pero lo necesita
    numero: PropTypes.number.isRequired

}