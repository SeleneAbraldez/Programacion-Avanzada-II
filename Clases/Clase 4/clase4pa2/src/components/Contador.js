//imr
//imr
import React, { Component } from 'react';

//ccc
class Contador extends Component {
    //cuando lo llamamos por primera vez se genera pero no cambian
    //las props son solo de lectura, inmutables
    //es unicamente que conruye, render app y saludo pero cambio en cosntructor o state es lo unicp que genera cambio
    constructor(props) {
        super(props);

        console.log("Contador");

        this.state = {
            contador: 0,
        };

        //en relaidad no deberia actualizar desde el ciclo de vida, mas adelante revisar
        setInterval(() => {
            //cadsa un segundo llamo al set starte para que se reincie el componente, como un timercontados
            this.setState({
                contador: this.state.contador + 1
            });
        }, 1000);

    }

    componentDidMount() {
        //no lo peudo recibir y diuejar, tengo que montarlo asi peudo actualizar, porque todava no existe peor debe estar
        //porque la pagina debe estar para poder cambiar, cosntruyendo en memoria, renderiza y montado en pantalla 
        console.log("Contador Mount");
    }

    componentDidUpdate() {
        console.log("Contador Update");
    }

    iniciar = (e)=>{
        
    }

    render() {
        console.log("Contador Render");
        return (
            <>
                <h2>Soy un contador</h2>
                <p>{this.state.contador}</p>
            </>
        );
    }
}


export default Contador;