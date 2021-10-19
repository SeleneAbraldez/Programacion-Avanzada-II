import React from "react";
import {crearCondiciones} from "../helper"

const Turno = ({ turno, bajaTurno }) => {

    const { id, nombre, edad, genero, fecha, grupo, diabetes, obesidad, asma } = turno;
    let condiciones = crearCondiciones(diabetes, obesidad, asma);

    const handleClick = (id) => {
        console.log("1");
        bajaTurno(id);
    }

    return (
        <>
            <div className="turno">
                <p>Nombre:  <span>{nombre}</span></p>
                <p>Edad: {edad}</p>
                <p>Genero: {genero}</p>
                <p>Fecha: {fecha}</p>
                <p>Grupo: {grupo}</p>
                <p>Condiciones: {condiciones}</p>
                <button type="button" value="Eliminar" className="u-fullwidth button eliminar" 
                    onClick={()=>{handleClick(id)}}
                >Eliminar Turno</button>
            </div>
        </>
    );
}

export default Turno;