import React, { useState, useEffect } from "react";
import Formulario from "../src/componentes/Formulario";
import Turno from "../src/componentes/Turno";

function App() {

  let turnosIniciales = JSON.parse(localStorage.getItem("turnos"));
  if (turnosIniciales == null) {
    turnosIniciales = [];
  }

  const [turnos, setTurnos] = useState(turnosIniciales);

  const bajaTurno = (id) => {
    console.log("2");
    setTurnos(turnos.filter(turno => turno.id !== id));
  }

  //por hooks podemos especificarle por cual se queire que se actualice, viene a reemplazr el mount will, etc
  //ene ste cada vez que hacemos alta o baja actualizamos el estado, lo suaremos para el localstorage
  useEffect(() => {
    // console.log("Fui actualizado o montado");
    localStorage.setItem("turnos", JSON.stringify(turnos));
  }, [turnos]);

  return (
    <div>
      <h1>Turnos Vacunas</h1>
      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Formulario
              setTurnos={setTurnos}
              turnos={turnos}
            />
          </div>
          <div className="one-half column">
            {
              !turnos.length
                ? <h1>No hay Turnos sacados</h1> : (
                  turnos.map(turno => <Turno key={turnos.id} turno={turno} bajaTurno={bajaTurno} />)
                )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
