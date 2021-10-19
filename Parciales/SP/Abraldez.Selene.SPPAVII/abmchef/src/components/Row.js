import React from 'react';

const Row = ({ cocinero, handlerDelete, handlerUpdate }) => {
    const { id, nombre, edad, genero, especialidad, estaEliminado, cantEpisodios } = cocinero;
    console.log(cocinero);
    return (
        <tr>
            <td>{nombre}</td>
            <td>{edad}</td>
            <td>{genero}</td>
            <td>{especialidad}</td>
            <td>{cantEpisodios}</td>
            <td>{estaEliminado ? "Si" : "No"}</td>
            <td>
                <button style={{ backgroundColor: "rgb(100, 130, 110)" }} onClick={() => handlerUpdate(cocinero)}>Editar</button>
                <button style={{ backgroundColor: "rgb(100, 90, 60)" }} onClick={() => handlerDelete(id)}>Eliminar</button>
            </td>
        </tr>
    );
}

export default Row;