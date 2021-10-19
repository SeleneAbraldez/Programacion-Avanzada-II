import React, { useContext, useState } from 'react';
import { CategoriasContext } from '../context/CategoriasContext';
import { CoctelesContext } from '../context/CoctelesContext';

const Formulario = () => {

    const { categorias } = useContext(CategoriasContext);
    // console.log(categorias);
    const { setSearch, setFlagBusqueda } = useContext(CoctelesContext);

    const [busqueda, setBusqueda] = useState({
        ingrediente: "",
        categoria: "",
    });

    const { ingrediente, categoria } = busqueda;

    const handlerChange = (e) => {
        setBusqueda({ ...busqueda, [e.target.name]: e.target.value })
    }

    const handlerSubmit = (e) => {
        e.preventDefault();
        if (ingrediente.trim() === "" || categoria.trim() === "") {
            alert("Faltan Datos!!!");
            return;
        }else{
            setSearch(busqueda);
            setFlagBusqueda(true);
            console.log("Enviando...");
        }
    }

    return (
        <div className="row">
            <form className="col-12 mt-4" onSubmit={handlerSubmit}>
                <fieldset className="text-center">
                    <legend>
                        Buscar Bebidas por Ingrediente y Categoria
                    </legend>
                    <div className="row pt-4">
                        <div className="col-md-4">
                            <input
                                type="text"
                                name="ingrediente"
                                placeholder="--Ingrese Ingrediente--"
                                className="form-control"
                                value={ingrediente}
                                onChange={handlerChange}>
                            </input>
                        </div>
                        <div className="col-md-4">
                            <select name="categoria"
                                className="form-control"
                                value={categoria}
                                onChange={handlerChange}>
                                <option value="">--Seleccione Categoria--</option>
                                {
                                    categorias.map(categoria => <option key={categoria.strCategory} value={categoria.strCategory}>{categoria.strCategory}</option>)
                                }
                            </select>
                        </div>
                        <div className="col-md-4">
                            <input type="submit"
                                value="Buscar Bebidas"
                                className="btn btn-danger w-100" />
                        </div>
                    </div>
                </fieldset>
            </form>
        </div>
    );
}

export default Formulario;