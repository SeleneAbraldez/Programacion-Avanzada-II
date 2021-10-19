import React, { useEffect, useState } from 'react';
import Formulario from './components/Formulario';
import Header from "./components/Header";
import Tabla from './components/Tabla';
import Loader from "./components/Loader";

const URL = "http://localhost:5000/chef";

function App() {

  const [cocineros, setCocineros] = useState([]);
  const [editado, setEditado] = useState(null);
  const [loading, setLoading] = useState(false);
  const [resultado, setResultado] = useState(false);

  useEffect(() => {
    fetch(URL)
      .then((res) => {
         return res.ok ? res.json() : Promise.reject(res);
      })
      .then((data) => {
        setCocineros(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const altaCocinero = (nuevoCocinero) => {
    setLoading(true);
    setTimeout(() => {
      nuevoCocinero.id = Date.now();
      setCocineros([...cocineros, nuevoCocinero]);
      setLoading(false);
    }, 3000);
  };

  const modificarCocinero = (modificadoCocinero) => {
    setCocineros(cocineros.map(co => co.id === modificadoCocinero.id ? modificadoCocinero : co))
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
      {
        loading ? <Loader /> :
          <Tabla
            cocineros={cocineros}
            bajaCocineros={bajaCocinero}
            setEditado={setEditado}
          ></Tabla>
      }
    </div>
  );
}

export default App;
