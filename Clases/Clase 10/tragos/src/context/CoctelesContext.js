import axios from 'axios';
import React, { useState, useEffect, createContext } from 'react';

export const CoctelesContext = createContext();

const CoctelesProvider = ({ children }) => {

    const [resultados, setResultado] = useState([]);
    const [search, setSearch] = useState({
        ingredientes: "",
        categoria: ""
    });
    const [flagBusqueda, setFlagBusqueda] = useState(false);
        
    useEffect(() => {
        const { ingrediente, categoria } = search;
        const URL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingrediente}&c=${categoria}`;
        const traerTragos = async () => {
            try {
                if (!flagBusqueda) return;
                const respuesta = await axios.get(URL);
                // console.log(respuesta);
                setResultado(respuesta.data.drinks);
            } catch (error) {
                console.error(error);
            }
        }
        traerTragos();
    }, [search, flagBusqueda]);


    return (
        <CoctelesContext.Provider
            value={{
                setSearch,
                resultados,
                setFlagBusqueda
            }}>
            {children}
        </CoctelesContext.Provider>
    )

}

export default CoctelesProvider;