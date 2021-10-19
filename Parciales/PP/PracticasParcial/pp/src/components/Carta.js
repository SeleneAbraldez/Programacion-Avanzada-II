import React from 'react';

const Carta = ({ carta }) => {

    const { id, name, image, upright, reversed } = carta;

    return (
        <figure>
            <img src={image} alt={`imagen de carta ${id}`} />
            <figcaption>{id} - {name}</figcaption>
        </figure>
    );
}

export default Carta;