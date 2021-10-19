import React from 'react';
import Pokemon from './Pokemon';

const Listado = ({ lista }) => {
    return (
        <div className="listado">
            {
                // en vez de usar array.isarray(lista) && etc, se utiliza el operador de ? para avsiarte si no llega
                lista?.map(pokemon => <Pokemon key={pokemon.id} pokemon={pokemon} />)
            }
        </div>

    );
}

export default Listado;