import React, { useState, useEffect } from 'react';

const formInicual = {
    id: null, interpretacion: ""
};

const Formulario = ({ altaTirada, listaCartas, modificarInterpretacion, editado, setEditado }) => {

    const [form, setForm] = useState(formInicual);
    const { id, interpretacion} = form;

    useEffect(() => {
        editado && setForm(editado);
    }, [editado]);

    const handlerChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    };

    const handlerSubmit = (e) => {
        e.preventDefault();
        if (interpretacion.trim() === "") {
            alert("Datos Incompletos!!");
            return;
        }
        //alta o update
        editado ? modificarInterpretacion(form) :
            altaTirada(form, listaCartas);

        handlerReset();
    }

    const handlerReset = (e) => {
        setForm(formInicual);
        setEditado(null);
    }

    return (
        <div className="contenedor-form">
            <form onSubmit={handlerSubmit}>
                <input type="text" name="interpretacion" placeholder="Ingrese interpretacion" onChange={handlerChange} value={interpretacion} />
                <input type="submit" value={editado ? 'Editar Tirada' : 'Agregar Tirada'} />
                <input type="reset" value="Limpiar" onClick={handlerReset} />
            </form>
        </div>
    );
}

export default Formulario;