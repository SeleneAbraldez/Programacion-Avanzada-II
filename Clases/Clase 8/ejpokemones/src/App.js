import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Listado from './components/Listado';
import Pokemon from './components/Pokemon';

let URL = 'https://pokeapi.co/api/v2/pokemon/';

//aca lo estamos realizando con el fetch sincronico, guardo al version vieja
// function App() {

//   const [lista, setLista] = useState([]);
//   //en el ejemplo el profe no lo hace pero como ej dejamos el loading, deberiamso hacer lo mismo con error por ej
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     setLoading(true);
//     fetch(URL)
//       .then(response => {
//         return response.ok ? response.json() : Promise.reject(response);
//       })
//       .then(data => {
//         // console.log(data);
//         //ya que nosb trae un array de result con los primero 20 eleemntos, desestructuramos dentro de este apra sacar de ese
//         data.results.forEach(item => {
//           fetch(item.url)
//             .then(response => {
//               return response.ok ? response.json() : Promise.reject(response);
//             })
//             .then((p) => {
//               // console.log(p);
//               const nuevoPokemon = { id: p.id, name: p.name, avatar: p.sprites.front_default };
//               //el set si es con uno solo no hay problema, peor ojo cuando es asincronico
//               //aca el profe explica que con el callback es un cuando vos puedas, pero sigue sin funcionar asiconcrnico asi que quein sabe 
//               setLista((value) => [...value, nuevoPokemon]);
//             })
//             .catch(err => {
//               console.log(err);
//               // setLoading(false);
//             })
//         })
//       })
//       .catch(error => {
//         console.log(error);
//         // setLoading(false);
//       })
//       .finally(() => {
//         setLoading(false);
//       })
//   }, []);

// return (
//   <div className="App">
//     <Header title="Listado de Pokemones"></Header>
//     {
//       loading || <Listado lista={lista} />
//     }
//   </div>
// );

// }

function App() {

  const [lista, setLista] = useState([]);
  const [loading, setLoading] = useState(false);
  const [prev, setPrev] = useState(null);
  const [next, setNext] = useState(null);
  const [peticion, setPeticion] = useState(false);

  const handlerNext = () => {
    if(!next) return;
    // console.log("next");
    URL = next;
    setPeticion(!peticion);
  }

  const handlerPrev = () => {
    if(!prev) return;
    // console.log("prev");    
    URL = prev;
    setPeticion(!peticion);
  }

  //el async no va en el useEfect 
  useEffect(() => {
    setLista([]);
    //hacemos que el getData sea el async, y luego lo llamamos
    const getData = async () => {
      setLoading(true);

      try {
        let res = await fetch(URL);
        let data = await res.json();
        // console.log(data);
        setNext(data.next);
        setPrev(data.previous);

        data.results.forEach(async (item) => {
          let res = await fetch(item.url);
          let p = await res.json();
          const nuevoPokemon = { id: p.id, name: p.name, avatar: p.sprites.front_default };
          setLista((value) => [...value, nuevoPokemon]);
        })

      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    //lo llamamos
    getData();
  
  }, [peticion]);


  return (
    <div className="App">
      <Header title="Listado de Pokemones" handlerNext={handlerNext} handlerPrev={handlerPrev}></Header>
      {
        loading || <Listado lista={lista} />
      }
    </div>
  );

}

export default App;
