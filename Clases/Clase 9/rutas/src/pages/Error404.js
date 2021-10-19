import React from 'react';
import imagen from '../assets/error404.jpg';
import ButtonBack from '../components/ButtonBack';

const Error404 = () => {
    return ( 
        <div>
           <img src={imagen} alt="imagen error 404"></img>
            <ButtonBack></ButtonBack>
        </div>
     );
}
 
export default Error404;