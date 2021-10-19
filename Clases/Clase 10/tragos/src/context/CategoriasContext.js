import React, { createContext, useEffect, useState } from 'react';
import axios from "axios";
//creamos contexto y ahora el provider funcion props
export const CategoriasContext = createContext();

const CategoriasProvider = ({ children }) => {

    const [categorias, setCategorias] = useState([]);

    useEffect(() => {
        const URL = "https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list";
        const traerCategorias = async () => {
            try {
                const respuesta = await axios.get(URL);
                // console.log(respuesta);
                setCategorias(respuesta.data.drinks);

            } catch (error) {
                console.error(error);
            }
        }
        traerCategorias();
    }, []);

    return (
        <CategoriasContext.Provider
            value={{
                // lo que quiero exponer
                // mensaje: "hola",
                categorias,
            }}
        >
            {children}
        </CategoriasContext.Provider>
    )
}

export default CategoriasProvider;