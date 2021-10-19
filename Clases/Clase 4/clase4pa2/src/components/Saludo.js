import React from 'react';

//sfc
//se llama props por convencios
//vieen un objeto props pero lo desestructura en las llaves directamente, podiendo volar todo
// const Saludo = (props) => {
//     return (
//         <h2>Hola {props.mensaje}</h2>
//     )
// }
const Saludo = ({mensaje, booleano, array, funcion, componente, objeto}) => <p>Hola {mensaje} {booleano?"true":"false"} {array.map(funcion)} {componente} {objeto.nombre}</p> ;
// {array.map(el=>el*2)}
export default Saludo;