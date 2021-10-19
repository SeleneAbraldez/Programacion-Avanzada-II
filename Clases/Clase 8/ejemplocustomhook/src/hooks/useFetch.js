//hook customizado reutilizable
import { useState, useEffect } from 'react';

// podria venir tambien el options, por ej
//export default no ya que eso permite que puedas desetructurar con otro nombre y necesitamos la misma key
export const useFetch = (url, dataInicial) => {
    const [data, setData] = useState(dataInicial);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const getData = () => {
        setLoading(true);
        fetch(url)
            .then((result) => {
                return result.ok ? result.json() : Promise.reject(result);
            })
            .then((data) => {
                setData(data);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                //este es un ejemplo pero aqui se deberia configurar el mensaje por ejempolo
                setError(true);
            })
    }

    useEffect(() => {
        getData();
        // quiero que se ejecute solamente una vez, por eso el array vacio
    }, []);

    return { data, loading, error };
    // no necesitamos hacer el data:data ya que si son de iguales intuye el pasado
};