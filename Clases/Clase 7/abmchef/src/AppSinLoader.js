import React, { useState } from 'react';
import Formulario from './components/Formulario';
import Header from "./components/Header";
import Tabla from './components/Tabla';


const lista = [
  { id: 1, nombre: "German", especialidad: "Vegetales" },
  { id: 2, nombre: "Laura", especialidad: "Milanesas" },
  { id: 3, nombre: "Damian", especialidad: "Hamburgesas" },
  { id: 4, nombre: "Maura", especialidad: "Tacos" }
];

function App2() {

  const [cocineros, setCocineros] = useState(lista);
  const [editado, setEditado] = useState(null);

  const altaCocinero = (nuevoCocinero) => {
    nuevoCocinero.id = Date.now();
    setCocineros([...cocineros, nuevoCocinero]);
  };

  const modificarCocinero = (modificadoCocinero) => {
    setCocineros(cocineros.map(co => co.id === modificadoCocinero.id?modificadoCocinero:co))
  };

  const bajaCocinero = (id) => {
    setCocineros(cocineros.filter(co => co.id !== id))
  };

  return (
    <div>
      <Header title="Chef"></Header>
      <Formulario
        altaCocinero={altaCocinero}
        modificarCocinero={modificarCocinero}
        editado={editado}
        setEditado={setEditado}
      ></Formulario>
      <Tabla
        cocineros={cocineros}
        bajaCocineros={bajaCocinero}
        setEditado={setEditado}
      ></Tabla>
    </div>
  );
}

export default App2;
