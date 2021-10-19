import React, { createContext, useEffect, useState } from 'react';
import axios from "axios";

export const ModalContext = createContext();

const ModalProvider = ({ children }) => {

    const [flagReceta, setFlagReceta] = useState(false);
    const [id, setId] = useState(null);
    const [receta, setReceta] = useState({});

    useEffect(() => {
        const traerReceta = async () => {
            const URL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;

            try {
                if(!flagReceta) return;
                const response = await axios.get(URL);
                // console.log(response);
                setReceta(response.data.drinks[0]);
            } catch (error) {
                console.log(error);
            }
        }
        traerReceta();

    }, [id, setFlagReceta]);

    return (
        <ModalContext.Provider
            value={{
                setId,
                receta,
                setFlagReceta
            }}
        >
            {children}
        </ModalContext.Provider>
    )
}

export default ModalProvider;