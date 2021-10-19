import React from 'react';
import imagen from '../assets/error404.jpg';

const Error404 = () => {
    return ( 
        <div>
           <img src={imagen} alt="imagen error 404"></img>
           {/* <h1>Vaya a /login!</h1> */}
        </div>
     );
}
 
export default Error404;