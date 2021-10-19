import React from 'react';
import Row from './Row';

const Tabla = ({ tiradaBool, listaTiradas, bajaInterpretacion, setEditado }) => {
    return (
        <div className="contenedor-tabla">
            <table>
                <thead>
                    <tr>
                        <th>Fecha</th>
                        <th>Cartas</th>
                        <th>Interpretacion</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody style={{ backgroundColor: "white" }}>
                    {
                        listaTiradas.length === 0 ? <tr><td colspan="4">Agregue una interpretacion!</td></tr> :
                        listaTiradas.map(tir =>
                                <Row
                                    key={tir.id}
                                    tirada={tir}
                                    handlerUpdate={setEditado}
                                    handlerDelete={bajaInterpretacion}
                                />)}
                </tbody>
            </table>

        </div>
    );
}

export default Tabla;