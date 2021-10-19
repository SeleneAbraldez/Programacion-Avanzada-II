import React from 'react';
import arrow from '../assets/forward-button.png';


const BotonNext = ({handlerClick}) => {
    return (
        <div>
            <button onClick={handlerClick}>
                <img src={arrow} alt="flecha next"/>
            </button>
        </div>);
}

export default BotonNext;