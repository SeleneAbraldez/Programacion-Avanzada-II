import React from 'react';

const Row = ({ tirada, handlerDelete, handlerUpdate }) => {
    const { id, fecha, cartas, interpretacion } = tirada;
    return (
        <tr>
            <td>{fecha}</td>
            <td>
                <img src={cartas[0].image} alt={`imagen de carta ${cartas[0].id}`} />
                <img src={cartas[1].image} alt={`imagen de carta ${cartas[1].id}`} />
                <img src={cartas[2].image} alt={`imagen de carta ${cartas[2].id}`} />
            </td>
            <td>{interpretacion}</td>
            <td>
                <button style={{ backgroundColor: "rgb(150, 130, 210)" }} onClick={() => handlerUpdate(tirada)}>Editar</button>
                <button style={{ backgroundColor: "rgb(200, 90, 60)" }} onClick={() => handlerDelete(id)}>Eliminar</button>
            </td>
        </tr>
    );
}

export default Row;