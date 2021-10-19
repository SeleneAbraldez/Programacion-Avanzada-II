import React, { useState, useEffect } from 'react';

const formInicual = {
    id: null, nombre: "", especialidad: "", edad: "", genero: "", estaEliminado: "true", cantEpisodios: ""
};

const errorInicial = {
    error: false,
    mensaje: "",
    bgColor: ""
  }


const Formulario = ({ altaCocinero, modificarCocinero, editado, setEditado }) => {
    
    const [form, setForm] = useState(formInicual);
    const [error, setError] = useState(errorInicial);

    const { id, nombre, especialidad, edad, genero, estaEliminado, cantEpisodios } = form;

    useEffect(() => {
        editado && setForm(editado);
    }, [editado]);

    const handlerChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    };

    const handlerSubmit = (e) => {
        e.preventDefault();
        if (nombre.trim() === "" || especialidad.trim() === "" ) {
            alert("Datos Incompletos!!");
            let statusText = error.statusText || "Ocurrio un error";
            setError({
              error: true,
              mensaje: `Error: ${error.status} - ${statusText}`,
              bgColor: "red"
            });
            return;
        }
        if (edad < 0 || cantEpisodios < 0 || cantEpisodios > 100) {
            alert("Datos no validos!");
            return;
        }
        //alta o update
        editado ? modificarCocinero(form) :
            altaCocinero(form);

        handlerReset();
    }

    const handlerReset = (e) => {
        setForm(formInicual);
        setEditado(null);
    }

    const eliminar = (event) => {
        // console.log(event.target.checked)
        // setForm({ ...form, estaEliminado: !event.target.checked });
        // console.log(event.target.value)
        // setForm({ ...form, estaEliminado: !this.target.value })
        // event.target.value === "true"
        //     ? setForm({ ...form, [event.target.name]: "true" })
        //     : setForm({ ...form, [event.target.name]: "false" });
                event.target.value === "Si"
            ? setForm({ ...form, [event.target.name]: true })
            : setForm({ ...form, [event.target.name]: false });
    }

    return (
        <div className="contenedor-form">
            <form onSubmit={handlerSubmit}>
                <input type="text" name="nombre" placeholder="Ingrese nombre" onChange={handlerChange} value={nombre} /> &nbsp;&nbsp;
                <input type="number" name="edad" placeholder="Ingrese edad" onChange={handlerChange} value={edad} /> &nbsp;&nbsp;

                <select name="genero" value={genero} onChange={handlerChange}>
                    <option disabled selected>-Seleccione Genero-</option>
                    <option value="Femenino">Femenino</option>
                    <option value="Masculino">Masculino</option>
                    <option value="Otro">Otro</option>
                    <option value="Prefiere No Especificar">Prefiere no Especificar</option>
                </select> &nbsp;&nbsp;

                <input type="text" name="especialidad" placeholder="Ingrese especialidad" onChange={handlerChange} value={especialidad} /> &nbsp;&nbsp;

                <input type="number" name="cantEpisodios" placeholder="Ingrese cant episodios" onChange={handlerChange} value={cantEpisodios} /> &nbsp;&nbsp;

                <label>¿Esta Eliminado?</label>
                <input id="eli" type="radio" name="estaEliminado" value="Si" onChange={eliminar} checked={estaEliminado} /> Si
                <input id="eli" type="radio" name="estaEliminado" value="No" onChange={eliminar} checked={!estaEliminado} /> No
                {/* <input type="checkbox" name="estaEliminado" onClick={eliminar} checked={estaEliminado || estaEliminado} /> */}

                <br></br>
                <input type="submit" value={editado ? 'Editar Cocinerx' : 'Agregar Cocinerx'} />
                <input type="reset" value="Limpiar" onClick={handlerReset} />
            </form>
        </div>
    );
}

export default Formulario;