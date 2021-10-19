import React from 'react';
import arrow from '../assets/prev-button.png';

const BotonPrev = ({handlerClick}) => {
    return (
        <div>
            <button onClick={handlerClick}>
            <img src={arrow} alt="flecha prev"/>
            </button>
        </div>);
}

export default BotonPrev;