import React from 'react';
import imagen from '../assets/error404.jpg';

const Error404 = () => {
    return ( 
        <div>
           <img src={imagen} alt="imagen error 404"></img>
        </div>
     );
}
 
export default Error404;