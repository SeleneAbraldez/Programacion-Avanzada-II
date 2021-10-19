import React, { useEffect, useState } from 'react';
import Formulario from './components/Formulario';
import Header from "./components/Header";
import Tabla from './components/Tabla';
import Loader from "./components/Loader";
import Mensaje from './components/Mensaje';

const URL = "http://localhost:5000/chef/";
const errorInicial = {
  error: false,
  mensaje: "",
  bgColor: ""
}

function App() {

  const [cocineros, setCocineros] = useState([]);
  const [editado, setEditado] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(errorInicial);

  useEffect(() => {
    setLoading(true);
    fetch(URL)
      .then((res) => {
        return res.ok ? res.json() : Promise.reject(res);
      })
      .then((data) => {
        setCocineros(data);
        setLoading(false);
        setError(errorInicial);
      })
      .catch((error) => {
        setLoading(false);
        let statusText = error.statusText || "Ocurrio un error";
        setError({
          error: true,
          mensaje: `Error: ${error.status} - ${statusText}`,
          bgColor: "red"
        });
      });
  }, []);

  const altaCocinero = (nuevoCocinero) => {
    setLoading(true);
    //aglcaramos en el header lo que qeuremos amndarle por el body 
    const options = {
      method: "POST",
      headers: {
        "Content-type": "application/json;charset=utf-8"
      },
      body: JSON.stringify(nuevoCocinero)
    };
    fetch(URL, options)
      .then(result => {
        return result.ok ? result.json() : Promise.reject(result)
      })
      .then((data) => {
        setCocineros([...cocineros, data]);
        setLoading(false);
        setError(errorInicial);
      })
      .catch((error) => {
        setLoading(false);
        let statusText = error.statusText || "Ocurrio un error";
        setError({
          error: true,
          mensaje: `Error: ${error.status} - ${statusText}`,
          bgColor: "red"
        });
      })
  };

  const modificarCocinero = (modificadoCocinero) => {
    if ((!window.confirm("Esta segurx que quiere modificar estx cocinerx?"))) return;
    setLoading(true);
    const options = {
      //read select update update create inserte delete deltele 
      //si no vamos a tocar la base de datos, debe ser get 
      //post apra create, put para update, patch modificar,  
      method: "PUT",
      headers: {
        "Content-type": "application/json;charset=utf-8"
      },
      body: JSON.stringify(modificadoCocinero)
    };
    fetch(URL + modificadoCocinero.id, options)
      .then(result => {
        return result.ok ? result.json() : Promise.reject(result)
      })
      .then((data) => {
        setCocineros(cocineros.map(co => co.id === data.id ? data : co));
        setError(errorInicial);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        let statusText = error.statusText || "Ocurrio un error";
        setError({
          error: true,
          mensaje: `Error: ${error.status} - ${statusText}`,
          bgColor: "red"
        });
      })
  };

  const bajaCocinero = (id) => {
    if ((!window.confirm("Esta segurx que quiere eliminar estx cocinerx?"))) return;
    setLoading(true);
    const options = {
      method: "DELETE",
      headers: {
        "Content-type": "application/json;charset=utf-8"
      }
    };
    fetch(URL + id, options)
      .then(result => {
        if (!result.ok) return Promise.reject(result);
        setCocineros(cocineros.filter(co => co.id !== id));
        setError(errorInicial);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        let statusText = error.statusText || "Ocurrio un error";
        setError({
          error: true,
          mensaje: `Error: ${error.status} - ${statusText}`,
          bgColor: "red"
        });
      })
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
      { error.error && <Mensaje colorLetra="white" bgColor={error.bgColor}>{error.mensaje}</Mensaje>}
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
