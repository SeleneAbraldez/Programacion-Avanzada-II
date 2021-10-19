import React from 'react';

const Pokemon = ({ pokemon }) => {

    const { id, name, avatar } = pokemon;

    return (
        <figure>
            <img src={avatar} alt={`avatar de pokemon ${id}`} />
            <figcaption>{name}</figcaption>
        </figure>
    );
}

export default Pokemon;