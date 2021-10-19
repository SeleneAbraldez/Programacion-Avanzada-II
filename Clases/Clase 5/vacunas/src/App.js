import React, { useState } from "react";
import Header from "../src/componentes/Header"
import Footer from "../src/componentes/Footer"
import Lista from "../src/componentes/Lista"
import Carrito from "../src/componentes/Carrito"
import './App.css';


function App() {

  const [vacunas, setVacunas] = useState([
    { id: 1, marca: "Sputnik", precio: 20 },
    { id: 2, marca: "Sputnik", precio: 30 },
    { id: 3, marca: "Sputnik", precio: 40 },
    { id: 4, marca: "Sputnik", precio: 50 },
  ])

  const [carrito, setCarrito] = useState([

  ])

  return (
    <div className="container">
      <Header titulo={"Vacunas Reactivas"} />
      <section className="principal">
        <Lista
          titulo={"Listado de Vacunas"}
          vacunas={vacunas}
          setCarrito={setCarrito}
          carrito={carrito}
        />
        <Carrito
          titulo={"Carrito de Compras"}
          setCarrito={setCarrito}
          carrito={carrito} />
      </section>
      <Footer />
    </div>
  );
}

export default App;
