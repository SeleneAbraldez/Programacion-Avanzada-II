import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const utnFra = {
  titulo: "Carrera Sistemas UTN FRA",
  carreras: [
    {
      nombre: "Tecnico Universitario en Programacion",
      cantMaterias: 21
    },
    {
      nombre: "Tecnico Universitario en Sistemas",
      cantMaterias: 15
    },
    {
      nombre: "Licenciatura en quien sabe que",
      cantMaterias: 20
    }
  ]
};

export default App;
ReactDOM.render(
  <App facultad={utnFra} />,
  document.getElementById('root')
);


