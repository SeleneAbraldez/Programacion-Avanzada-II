import logo from './logo.svg';
import './App.css';
import { Component } from 'react';

const Saludo = (props) => {
  return <h2>Hola {props.name}</h2>
}

class Despedida extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <h3>Chau {this.props.name}</h3>
  }
}

const nombre = "Jose";

// componentes en mayuscula
function App() {
  return (
    <div className="App">
      <Saludo name={nombre}></Saludo>
      <Despedida name="Juana" />
    </div>
  );
}

export default App;
