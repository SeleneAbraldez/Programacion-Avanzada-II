//imr
//imr
import React, { Component } from 'react';

//ccc
class Hora extends Component {
    //cuando lo llamamos por primera vez se genera pero no cambian
    //las props son solo de lectura, inmutables
    //es unicamente que conruye, render app y saludo pero cambio en cosntructor o state es lo unicp que genera cambio
    constructor(props) {
        super(props);

        console.log("Hora");

        this.state = {
            hora: new Date().toLocaleTimeString(),
        };

        this.temporizador = null;
        //ahora le estoy pasando al manejador algp que ya tiene el spoke
        this.iniciar = this.iniciar.bind(this);
        this.detener = this.detener.bind(this);
    }

    componentDidMount() {
        //no lo peudo recibir y diuejar, tengo que montarlo asi peudo actualizar, porque todava no existe peor debe estar
        //porque la pagina debe estar para poder cambiar, cosntruyendo en memoria, renderiza y montado en pantalla 
        console.log("Hora Mount");
    }

    componentDidUpdate() {
        console.log("Hora Update");
    }

    // iniciar(e) {
    //     console.log("Iniciar");
    //     //me devuelve un objeto que me mata el proceso
    //     //this es undefined porque lo esta lklamando alguien que no es contador
    //     //asi que geenro el this iniciar
    //     this.temporizador = setInterval(() => {
    //         //cadsa un segundo llamo al set starte para que se reincie el componente, como un timercontados
    //         this.setState({
    //             hora: new Date().toLocaleTimeString()
    //         });
    //     }, 1000);
    // }

    // detener(e){
    //     console.log("Detener");
    //     clearInterval(this.temporizador);
    // }

    //los convioerto a arrow function
    //alargan el scope del apdre
    iniciar = (e) => {
        console.log("Iniciar");
        this.temporizador = setInterval(() => {
            this.setState({
                hora: new Date().toLocaleTimeString()
            });
        }, 1000);
    }

    detener = (e) => {
        console.log("Detener");
        clearInterval(this.temporizador);
    }

    render() {
        console.log("Hora Render");
        return (
            <>
                <h2>Soy una hora?</h2>
                <p>{this.state.hora}</p>
                {/* <button type="button" onClick={this.detener}>Parar</button> */}
                <button type="button" onClick={this.detener}>Parar</button>
                {/* <button type="button" onClick={this.iniciar}>Iniciar</button> */}
                <button type="button" onClick={this.iniciar}>Iniciar</button>
            </>
        );
    }
}


export default Hora;