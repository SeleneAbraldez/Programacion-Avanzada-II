import React from 'react';
import Carta from './Carta';

const Listado = ({ lista }) => {
    return (
        <div className="listado">
            {
                lista?.map(carta => <Carta key={carta.id} carta={carta} />)
            }
        </div>
    );
}

export default Listado;