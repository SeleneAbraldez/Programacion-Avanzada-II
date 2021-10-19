import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Listado from './components/Listado';
import Loader from "./components/Loader";
import Tabla from './components/Tabla';
import Formulario from './components/Formulario';
import Mensaje from './components/Mensaje';

// let URL = 'https://fathomless-sands-06419.herokuapp.com/api/v1/cards/';
let URL = 'https://fathomless-sands-06419.herokuapp.com/api/v1/spreads/three_cards';
let URLTiradas = 'http://localhost:5000/tiradas/';

const errorInicial = {
  error: false,
  mensaje: "",
  bgColor: ""
}

function App() {

  const [listaCartas, setListaCartas] = useState([]);
  const [listaTiradas, setListaTiradas] = useState([]);
  const [editado, setEditado] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(errorInicial);

  const [tiradaToogle, setTiradaToogle] = useState(false);
  const [significadosToogle, setSignificadosToogle] = useState(false);
  const [listaToogle, setListaToogle] = useState(true);

  const handlerTiradaToogle = () => {
    if (!tiradaToogle) return;
    URL = 'https://fathomless-sands-06419.herokuapp.com/api/v1/spreads/three_cards';
    // setPeticion(!peticion);
  }

  const handlerSignificadosToogle = () => {
    if (!significadosToogle) return;
    URL = 'https://fathomless-sands-06419.herokuapp.com/api/v1/cards/';
    // setPeticion(!peticion);
  }

  const handlerListaToogle = () => {
    if (!listaToogle) return;
    URL = 'https://fathomless-sands-06419.herokuapp.com/api/v1/cards/';
    // setPeticion(!peticion);
  }

  useEffect(() => {
    setListaCartas([]);
    setLoading(true);

    //tiradas
    fetch(URLTiradas)
      .then((res) => {
        return res.ok ? res.json() : Promise.reject(res);
      })
      .then((data) => {
        setListaTiradas(data);
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

    //////////////////////////////////////////////////////////////
    //generamos la varuable asincrona apra despues llamarla
    const getData = async () => {

      try {
        let result = await fetch(URL);
        let data = await result.json();

        // botones?

        data.forEach(async (c) => {
          const nuevaCarta = { id: c.id, name: c.name, upright: c.upright, reversed: c.reversed, image: c.image };
          setListaCartas((value) => [...value, nuevaCarta]);
        })

      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getData();

  }, []);

  const altaTiradaSinc = (nuevaTirada, tiradaDeTres) => {
    setLoading(true);
    let d = new Date();
    nuevaTirada.fecha = d.toLocaleString();
    nuevaTirada.cartas = tiradaDeTres;
    const body = JSON.stringify(nuevaTirada);
    const options = {
      method: "POST",
      headers: {
        "Content-type": "application/json;charset=utf-8"
      },
      body: body
    };
    fetch(URLTiradas, options)
      .then(result => {
        return result.ok ? result.json() : Promise.reject(result)
      })
      .then((data) => {
        setListaTiradas([...listaTiradas, data]);
        // console.log(data);
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


  const altaTirada = (nuevaTirada, tiradaDeTres) => {
    setLoading(true);
    let d = new Date();
    nuevaTirada.fecha = d.toLocaleString();
    nuevaTirada.cartas = tiradaDeTres;
    const body = JSON.stringify(nuevaTirada);
    const options = {
      method: "POST",
      headers: {
        "Content-type": "application/json;charset=utf-8"
      },
      body: body
    };

    const getData = async () => {
      setLoading(true);

      try {
        let res = await fetch(URLTiradas, options);
        let data = await res.json();
        setListaTiradas([...listaTiradas, data]);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  };


  const modificarInterpretacionSinc = (interpretacion) => {
    console.log(interpretacion);
    if ((!window.confirm("Esta segurx que quiere modificar esta interpretacion?"))) return;
    setLoading(true);
    const options = {
      method: "PUT",
      headers: {
        "Content-type": "application/json;charset=utf-8"
      },
      body: JSON.stringify(interpretacion)
    };
    fetch(URLTiradas + interpretacion.id, options)
      .then(result => {
        // console.log(result);
        // console.log("1");

        return result.ok ? result.json() : Promise.reject(result)
      })
      .then((data) => {
        // console.log("2");

        setListaTiradas(interpretacion.map(inter => inter.id === data.id ? data : inter));
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

  const modificarInterpretacion = (interpretacion) => {
    console.log(interpretacion);
    if ((!window.confirm("Esta segurx que quiere modificar esta interpretacion?"))) return;
    setLoading(true);
    const options = {
      method: "PUT",
      headers: {
        "Content-type": "application/json;charset=utf-8"
      },
      body: JSON.stringify(interpretacion)
    };

    const getData = async () => {
      setLoading(true);

      try {
        let res = await fetch(URLTiradas + interpretacion.id, options);
        let data = await res.json();
        console.log(data);

        data.results.forEach(async (item) => {
          let res = await fetch(item.url);
          let p = await res.json();
          setListaTiradas(p.map(inter => inter.id === data.id ? data : inter));
          // const nuevoPokemon = { id: p.id, name: p.name, avatar: p.sprites.front_default };
          // setLista((value) => [...value, nuevoPokemon]);
        })

        setError(errorInicial);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        let statusText = error.statusText || "Ocurrio un error";
        setError({
          error: true,
          mensaje: `Error: ${error.status} - ${statusText}`,
          bgColor: "red"
        });
      } finally {
        setLoading(false);
      }
    };
    getData();
  };

  const bajaInterpretacionSinc = (id) => {
    if ((!window.confirm("Esta segurx que quiere eliminar esta interpretacion?"))) return;
    setLoading(true);
    const options = {
      method: "DELETE",
      headers: {
        "Content-type": "application/json;charset=utf-8"
      }
    };
    fetch(URLTiradas + id, options)
      .then(result => {
        if (!result.ok) return Promise.reject(result);
        setListaTiradas(listaTiradas.filter(tir => tir.id !== id));
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

  const bajaInterpretacion = (id) => {
    if ((!window.confirm("Esta segurx que quiere eliminar esta interpretacion?"))) return;
    setLoading(true);
    const options = {
      method: "DELETE",
      headers: {
        "Content-type": "application/json;charset=utf-8"
      }
    };

    const getData = async () => {
      setLoading(true);

      try {
        let res = await fetch(URLTiradas + id, options);
        let data = await res.json();
        console.log(data);

        data.results.forEach(async (item) => {
          let res = await fetch(item.url);
          let p = await res.json();
          setListaTiradas(p.filter(tir => tir.id !== id));
          // const nuevoPokemon = { id: p.id, name: p.name, avatar: p.sprites.front_default };
          // setLista((value) => [...value, nuevoPokemon]);
        })

        setError(errorInicial);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        let statusText = error.statusText || "Ocurrio un error";
        setError({
          error: true,
          mensaje: `Error: ${error.status} - ${statusText}`,
          bgColor: "red"
        });
      } finally {
        setLoading(false);
      }
    };
    getData();
  };


  return (
    <div className="App">
      <Header title="Practica Primer Parcial"></Header>

      {
        loading ? <Loader /> : <Listado lista={listaCartas} />
      }
      <Formulario
        altaTirada={altaTirada}
        listaCartas={listaCartas}
        modificarInterpretacion={modificarInterpretacion}
        editado={editado}
        setEditado={setEditado}
      ></Formulario>
      { error.error && <Mensaje colorLetra="white" bgColor={error.bgColor}>{error.mensaje}</Mensaje>}
      {
        loading ? <Loader /> :
          <Tabla
            listaTiradas={listaTiradas}
            bajaInterpretacion={bajaInterpretacion}
            setEditado={setEditado}
          ></Tabla>
      }

      {/* {
        loading ? <Loader /> : <Listado lista={listaCartas} />
      } */}

      {/* {
        loading ? <Loader /> :
          <Tabla
            listaTiradas={listaTiradas}
            bajaInterpretacion={bajaInterpretacion}
            setEditado={setEditado}
          ></Tabla>
      } */}

    </div>
  );
}

export default App;
