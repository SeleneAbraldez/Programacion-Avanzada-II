import React, { createContext, useEffect, useState } from 'react';
//creamos contexto y ahora el provider funcion props
export const TokenContext = createContext();

const TokenProvider = ({children}) => {

    // const [token, setToken] = useState(null);

    // const flagToken = async () => {
    //     await setToken(localStorage.getItem("tokenLogin"));
    //   }

    // useEffect(() => {
    //     // flagToken();
    //     setToken(localStorage.getItem("tokenLogin"));
    //     // console.log(localStorage.getItem("tokenLogin"));
    //     // console.log(token);
    // }, [token]);    

    return (
        <TokenContext.Provider value={{ token: localStorage.getItem("tokenLogin") }}>{children}</TokenContext.Provider>
    )
}

export default TokenProvider;