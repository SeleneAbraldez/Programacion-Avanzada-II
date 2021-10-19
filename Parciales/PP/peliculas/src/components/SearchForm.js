import React, { useState } from 'react';

const SearchForm = ({ onSearch }) => {

    const [titulo, setTitulo] = useState("");
    //usamos s que es de busqueda, par auqe sea u unico titulo exacto deberia ser t de titulo
    const URL = `http://www.omdbapi.com/?apikey=61a4603&s=`;

    const handlerChange = (e) => {
        setTitulo(e.target.value);
    };

    const handlerSubmit = (e) => {
        e.preventDefault();

        if (titulo.trim() === "") {
            alert("Datos Incompletos!");
            return;
        } else {

            // fetch(URL + titulo)
            //     .then((res) => {
            //         // console.log(res);
            //         return res.ok ? res.json() : Promise.reject(res);
            //     })
            //     .then((data) => {
            //         console.log(data);
            //         data.Response === "True" ?
            //             onSearch(data.Search) :
            //             onSearch({ mensaje: data.Error });
            //     })
            //     .catch((error) => {
            //         console.log(error.status, error.statusText);
            //     })

            const getData = async () => {
                try {
                    let res = await fetch(URL + titulo);
                    let data = await res.json();
                    // console.log(data);
                    data.Response === "True" ?
                            onSearch(parseInt.Search) :
                            onSearch({ mensaje: data.Error });

                    // data.results.forEach(async (item) => {
                    //     let res = await fetch(item.url);
                    //     let p = await res.json();
                    //     console.log(p);
                    //     p.Response === "True" ?
                    //         onSearch(parseInt.Search) :
                    //         onSearch({ mensaje: p.Error });
                    // })

                } catch (error) {
                    console.log(error.status, error.statusText);
                } finally {

                }
            };

            getData();
        }

    };

    return (
        <form onSubmit={handlerSubmit}>
            <div className="field has-addons">
                <div className="control">
                    <input className="input" type="text" name="titulo" placeholder="Ingrese Titulo" onChange={handlerChange} value={titulo} />
                </div>
                <div className="control">
                    <button className="button is-info">
                        Search
                    </button>
                </div>
            </div>
        </form>
    );
}

export default SearchForm;