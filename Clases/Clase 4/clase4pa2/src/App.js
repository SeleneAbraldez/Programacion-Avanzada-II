import React, { Component } from 'react';
import SaludoDeClase from './components/SaludoDeClase';
import Saludo from "./components/Saludo";
import Contador from "./components/Contador"
import ContadorFuncional from "./components/ContadorFuncional";
import Hora from './components/Hora';
import Listado from './components/Listado';
// const Component = React.Component;

//debe estar en mayusculas si no no lo reconoce
class App extends Component {
  //codigo js dentro de return, si no deberia tirar error pero en la clase no lo hizo asdfghjklñ
  //ppr mas quew sea texto, como le tengo que pasar una variable, es con llaves y con this
  nombre = "Jose";
  render() {
    //js va entre lalves, obligatorio o rompe
    //la "llamada" pasa como clave  
    return (
      <>
        <SaludoDeClase
          mensaje={this.nombre}
          booleano={true}
          array={[1, 2, 3, 4, 5]}
          funcion={(a) => 2 * a}
          componente={<strong>Hola Mundo</strong>}
          objeto={{ nombre: "Jose", edad: 40 }}
        />
        {/* siempre obligatorio cerrar, aun las que son self closing */}
        {/* <br />
        <Contador />
        <br />
        <ContadorFuncional /> */}
        {/* <br/>
        <Hora /> */}
        <br/>
        <Listado />
      </>
    )
  }
}

//componenete funcional con una func9ion declarada, podraia convertirno
//si hago que App sea un fuction o una funcion de flecha gorda, que se suele utilizar mas
//asi me ahorro el return
// const App = () => <h1>Hola Mundo</h1>;
export default App;
