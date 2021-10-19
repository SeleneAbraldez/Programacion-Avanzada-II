import React from 'react';
import { useHistory, useLocation } from 'react-router';

const Productos = () => {

    const { search } = useLocation();
    let params = new URLSearchParams(search);
    let id = params.get('id');
    let precio = params.get('precio');
    console.log(id, precio);


    return (<>
        <h1>Producto</h1>
    </>);
}

export default Productos;