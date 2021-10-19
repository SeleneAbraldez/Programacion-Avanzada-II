import React, { useEffect, useState, useContext } from 'react';
import Formulario from '../components/Formulario';
import Header from "../components/Header";
import Tabla from '../components/Tabla';
import Loader from "../components/Loader";
import Mensaje from '../components/Mensaje';
import { TokenContext } from '../context/TokenContext';

const URL = 'http://localhost:5000/api/cocineros';
const errorInicial = {
  error: false,
  mensaje: "",
  bgColor: ""
}

function HomePage() {

  const [cocineros, setCocineros] = useState([]);
  const [editado, setEditado] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(errorInicial);
  const { token } = useContext(TokenContext);
  // console.log(token);

  //traemos uno que no vence para probar
  const tokenHarcodeado = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ikp1cmFkbzEiLCJpZCI6IjYwZTVhZGUwOGNhZTFhM2MyM2ExYzQ3OSIsImlhdCI6MTYyNTY4NjAyOX0.7ZyInVVx6C0kx1OjBF2L-AJqo0pQsmRoAS-gxO24Oew"

  useEffect(() => {
    setError(errorInicial);
    setLoading(true);
    // console.log(token);
    const mostrarCocineros = async () => {
      try {
        const options = {
          method: "GET",
          headers: { "Content-type": "application/json;charset=utf-8", "Authorization": "Bearer " + token },
        }
        // console.log(options);
        const res = await fetch(URL, options);
        const data = await res.json();
        setCocineros(data);
        console.log(data);
        if(data.error == "TokenExpiredError" ){
          setError({
            error: true,
            mensaje: `Token Expirado!`,
            bgColor: "red"
          });
        }else if(data.error == "JsonWebTokenError"){
          setError({
            error: true,
            mensaje: `No posee token! Vuelva a logearse o no podra usar la aplicacion`,
            bgColor: "red"
          });
        }
        // setError(errorInicial);
      } catch (error) {
        let statusText = error.statusText || "Ocurrio un error";
        setError({
          error: true,
          mensaje: `Error: ${error.status} - ${statusText}`,
          bgColor: "red"
        });
      }
      finally {
        setLoading(false);
      };
    }
    mostrarCocineros();

  }, [token]);

  const altaCocinero = (nuevoCocinero) => {
    // setLoading(true);
    // //aglcaramos en el header lo que qeuremos amndarle por el body 
    // const options = {
    //   method: "POST",
    //   headers: {
    //     "Content-type": "application/json;charset=utf-8", "Authorization": "Bearer " + tokenHarcodeado
    //   },
    //   body: JSON.stringify(nuevoCocinero)
    // };
    // fetch(URL, options)
    //   .then(result => {
    //     return result.ok ? result.json() : Promise.reject(result)
    //   })
    //   .then((data) => {
    //     setCocineros([...cocineros, data]);
    //     setLoading(false);
    //     setError(errorInicial);
    //   })
    //   .catch((error) => {
    //     setLoading(false);
    //     let statusText = error.statusText || "Ocurrio un error";
    //     setError({
    //       error: true,
    //       mensaje: `Error: ${error.status} - ${statusText}`,
    //       bgColor: "red"
    //     });
    //   })

    setLoading(true);
    // console.log(nuevoCocinero);
    //aglcaramos en el header lo que qeuremos amndarle por el body 
    
    const alta = async () => {
      const options = {
        method: "POST",
        headers: {
          "Content-type": "application/json;charset=utf-8", "Authorization": "Bearer " + token
        },
        body: JSON.stringify(nuevoCocinero),
      };
      
      try {
        const res = await fetch(URL, options);
        const nuevoCocinero = await res.json();
        setCocineros([...cocineros, nuevoCocinero]);
        setError(errorInicial);
      } catch (error) {
        // console.log(error)
        let statusText = error.statusText || "Ocurrio un error";
        setError({
          error: true,
          mensaje: `Error: ${error.status} - ${statusText}`,
          bgColor: "red"
        });
      }
      finally {
        setLoading(false);
      }

      // fetch(URL, options)
      // .then((res) => {
      //   return res.ok ? res.json() : Promise.reject(res);
      // })
      // .then((data) => {
      //   setCocineros(data);
      //   setLoading(false);
      //   setError(errorInicial);
      // })
      // .catch((error) => {
      //   setLoading(false);
      //   let statusText = error.statusText || "Ocurrio un error";
      //   setError({
      //     error: true,
      //     mensaje: `Error: ${error.status} - ${statusText}`,
      //     bgColor: "red"
      //   });
      // });

    }

    alta();

  };

  const modificarCocinero = (modificadoCocinero) => {
    if ((!window.confirm("Esta segurx que quiere modificar estx cocinerx?"))) return;

    let id = modificadoCocinero.id;
    delete modificadoCocinero.id;
    setLoading(true);

    const options = {
      method: "PUT",
      headers: { "Content-type": "application/json;charset=utf-8", "Authorization": "Bearer " + token },
      body: JSON.stringify(modificadoCocinero)
    }

    const modificacion = async () => {
      try {
        const res = await fetch(URL + "/" + id, options);
        const nuevoCocinero = await res.json();
        setCocineros(cocineros.map((cocinerito) => {
          if (cocinerito.id === id) {
            cocinerito = modificadoCocinero;
            cocinerito.id = id;
          }
          return cocinerito;
        }));
        setError(errorInicial);
      } catch (error) {
        let statusText = error.statusText || "Ocurrio un error";
        setError({ error: true, mensaje: `Error: ${error.status} - ${statusText}`, bgc: "red" });
      }
      finally {
        setLoading(false);
      }

    }

    modificacion();

    // setLoading(true);
    // const options = {
    //   //read select update update create inserte delete deltele 
    //   //si no vamos a tocar la base de datos, debe ser get 
    //   //post apra create, put para update, patch modificar,  
    //   method: "PUT",
    //   headers: {
    //     "Content-type": "application/json;charset=utf-8",
    //     "Authorization": "Bearer " + token
    //   },
    //   body: JSON.stringify(modificadoCocinero)
    // };
    // fetch(URL + modificadoCocinero.id, options)
    //   .then(result => {
    //     return result.ok ? result.json() : Promise.reject(result)
    //   })
    //   .then((data) => {
    //     setCocineros(cocineros.map(co => co.id === data.id ? data : co));
    //     setError(errorInicial);
    //     setLoading(false);
    //   })
    //   .catch((error) => {
    //     setLoading(false);
    //     let statusText = error.statusText || "Ocurrio un error";
    //     setError({
    //       error: true,
    //       mensaje: `Error: ${error.status} - ${statusText}`,
    //       bgColor: "red"
    //     });
    //   })

  };

  const bajaCocinero = (id) => {
    if ((!window.confirm("Esta segurx que quiere eliminar estx cocinerx?"))) return;
    setLoading(true);

    const options = {
      method: "DELETE",
      headers: {
        "Content-type": "application/json;charset=utf-8",
        "Authorization": "Bearer " + token
      }
    };

    const eliminar = async () => {

      try {
        const res = await fetch(URL + "/" + id, options);
        setCocineros(cocineros.filter(cocinerito => cocinerito.id !== id));
        setError(errorInicial);

      } catch (error) {
        let statusText = error.statusText || "Ocurrio un error";
        setError({
          error: true,
          mensaje: `Error: ${error.status} - ${statusText}`,
          bgColor: "red"
        });
      }
      finally {
        setLoading(false);
      }
    }

    eliminar();

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
      {error.error && <Mensaje colorLetra="white" bgColor={error.bgColor}>{error.mensaje}</Mensaje>}
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

export default HomePage;