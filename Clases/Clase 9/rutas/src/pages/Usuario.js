import React from 'react';
import { useParams } from 'react-router';

const Usuario = () => {

    let {nombre, edad, email} = useParams();

    return ( 
        <>
        <h2>Datos Del Usuario</h2>
        <p>Nombre: {nombre}</p>
        <p>Edad: {edad}</p>
        <p>Email: {email}</p>
        </>
     );
}
 
export default Usuario;