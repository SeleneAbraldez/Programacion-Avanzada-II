import React, { useState } from 'react';
import Header from './components/Header';
import 'bulma/css/bulma.css';
import SearchForm from './components/SearchForm';
import MoviesList from './components/MoviesList';

function App() {

  const [lista, setLista] = useState([]);
  const [flag, setFlag] = useState(false);
  const [mensaje, setMensaje] =useState("");

  const handlerResults = (resultados) => {
    if(resultados.mensaje){
      setMensaje(resultados.mensaje);
    }else{
      setLista(resultados);
      setFlag(true);
      setMensaje("");
    }
  }

  return (
    <div className="App">
      <Header>Buscador de Peliculas</Header>
      <div className="container-form">
        <SearchForm onSearch={handlerResults} />
      </div>
      {
        flag || (mensaje ? <p>{mensaje}</p> : <MoviesList lista={lista}> </MoviesList> )
      }
    </div>
  );
}

export default App;
