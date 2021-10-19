import React from 'react';
import Row from './Row';

const Tabla = ({ cocineros, bajaCocineros, setEditado }) => {
    return (
        <div className="contenedor-tabla">
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Edad</th>
                        <th>Genero</th>
                        <th>Especialidad</th>
                        <th>Cantidad de Episodios</th>
                        <th>¿Esta Eliminado?</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody style={{ backgroundColor: "white" }}>
                    {
                        !cocineros.length ? <tr><td colSpan="7">Sin Resultados</td></tr> :
                            cocineros.map(co =>
                                <Row
                                    key={co.id}
                                    cocinero={co}
                                    handlerUpdate={setEditado}
                                    handlerDelete={bajaCocineros}
                                />)}
                </tbody>
            </table>

        </div>
    );
}

export default Tabla;