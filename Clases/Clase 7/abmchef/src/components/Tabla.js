import React from 'react';
import Row from './Row';

const Tabla = ({ cocineros, bajaCocineros, setEditado }) => {
    return (
        <div className="contenedor-tabla">
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Especialidad</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody style={{ backgroundColor: "white" }}>
                    {
                        cocineros.length === 0 ? <tr><td colspan="3">Sin Resultados</td></tr> :
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