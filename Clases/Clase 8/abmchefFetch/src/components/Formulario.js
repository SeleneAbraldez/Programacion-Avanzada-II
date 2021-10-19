import React, { useState, useEffect } from 'react';

const formInicual = {
    id: null, nombre: "", especialidad: ""
};

const Formulario = ({ altaCocinero, modificarCocinero, editado, setEditado }) => {

    const [form, setForm] = useState(formInicual);

    const { id, nombre, especialidad } = form;

    useEffect(() => {
        editado && setForm(editado);
    }, [editado]);

    const handlerChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    };

    const handlerSubmit = (e) => {
        e.preventDefault();
        if (nombre.trim() === "" || especialidad.trim() === "") {
            alert("Datos Incompletos!!");
            return;
        }
        //alta o update
        editado ? modificarCocinero(form) :
            altaCocinero(form);

        handlerRese();
    }

    const handlerRese = (e) => {
        setForm(formInicual);
        setEditado(null);
    }

    return (
        <div className="contenedor-form">
            <form onSubmit={handlerSubmit}>
                <input type="text" name="nombre" placeholder="Ingrese nombre" onChange={handlerChange} value={nombre} />
                <input type="text" name="especialidad" placeholder="Ingrese especialidad" onChange={handlerChange} value={especialidad} />
                <input type="submit" value={editado ? 'Editar Cocinerx' : 'Agregar Cocinerx'} />
                <input type="reset" value="Limpiar" onClick={handlerRese} />
            </form>
        </div>
    );
}

export default Formulario;