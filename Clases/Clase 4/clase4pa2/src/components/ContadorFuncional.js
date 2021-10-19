import React, { useState } from 'react';

const ContadorFuncional = () => {

    //por cada dato que necesito usar en ele staod
    //recbe un array con elementos
    //primero recibe un contador, que puede tener cualquier nombre
    //el set que le paso es el segudno, lo mismo quee star pasandole el state y el contador
    //en vez de pasar el opbjeto y cambair el estado, le pasamos ya el valor estado para poder cambiarlo directo
    const [contador, setContador] = useState(0);

    //se vuelve loco porque en el contador tiebne el contructr que monta y desmonta, no junta basura como ene ste
    //didmount didupdate
    //hooks
    setInterval(() => {
        setContador(contador + 1);
    }, 1000);

    //porque este no tiene el remder
    return (
        <>
            <h2>Soy un Contador Funcional</h2>
            <p>{contador}</p>
        </>
    )
}

export default ContadorFuncional;