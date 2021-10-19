import React, { useState } from "react";
import shortid from "shortid";

const Formulario = ({ setTurnos, turnos }) => {
    const [form, setForm] = useState({
        nombre: "",
        edad: "",
        genero: "Otro",
        fecha: "",
        grupo: "mas60",
        diabetes: false,
        obesidad: false,
        asma: true,
    });

    const { nombre, edad, genero, fecha, grupo, diabetes, obesidad, asma } = form;

    const [error, setError] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleChecked = (e) => {
        setForm({ ...form, [e.target.name]: e.target.checked });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log("Enviando...")
        if (nombre.trim() === "" || edad.trim() === "" || fecha.trim() === "") {
            setError(true);
            return;
        }
        setError(false);
        console.log("Valido");
        const nuevoTurno = { ...form };
        nuevoTurno.id = shortid.generate();
        console.log(nuevoTurno);
        setTurnos([...turnos, nuevoTurno]);

        setForm({
            nombre: "",
            edad: "",
            genero: "Otro",
            fecha: "",
            grupo: "",
            diabetes: false,
            obesidad: false,
            asma: true,
        });
    };


    return (
        <>
            <h2>Sacar turno</h2>
            {
                error ? <p className="alerta-error">Todos los campos son obligatorios</p> : null
            }
            <form onSubmit={handleSubmit}>
                <label htmlFor="txtNombre">
                    Nombre:
                </label>
                <input
                    className="u-full-width"
                    type="text"
                    id="txtNombre"
                    name="nombre"
                    placeholder="Ingrese Nombre"
                    onChange={handleChange}
                    value={nombre}
                />

                <label htmlFor="txtEdad">
                    Edad:
                </label>
                <input
                    className="u-full-width"
                    type="number"
                    id="edad"
                    name="edad"
                    placeholder="Ingrese Edad"
                    onChange={handleChange}
                    value={edad}
                />

                <label htmlFor="txtFecha">
                    Fecha de nacimiento:
                </label>
                <input
                    className="u-full-width"
                    type="date"
                    id="txtFecha"
                    name="fecha"
                    placeholder="Ingrese Fecha"
                    onChange={handleChange}
                    value={fecha}
                />

                <fieldset>
                    <legend>Genero:</legend>
                    <input
                        type="radio"
                        name="genero"
                        value="Masculino"
                        onChange={handleChange}
                        checked={genero === "Masculino"}
                    /> Masculino
                    <input
                        type="radio"
                        name="genero"
                        value="Femenino"
                        onChange={handleChange}
                        checked={genero === "Femenino"}
                    /> Femenino
                    <input
                        type="radio"
                        name="genero"
                        value="Otro"
                        onChange={handleChange}
                        checked={genero === "Otro"}
                    /> Otro
                </fieldset>
                <label htmlFor="grupo">Grupo Poblacional: </label>
                <select name="grupo" id="grupo" className="u-full-width" onChange={handleChange} value={grupo}>
                    <option value="mas60">Mayor de 60 años</option>
                    <option value="salud">Personal de salud</option>
                    <option value="prof">Profesor</option>
                </select>
                <fieldset >
                    <legend>Condiciones:</legend>
                    <input type="checkbox" name="diabetes" onChange={handleChecked} checked={diabetes} />Diabetes<br />
                    <input type="checkbox" name="obesidad" onChange={handleChecked} checked={obesidad} />Obesidad<br />
                    <input type="checkbox" name="asma" onChange={handleChecked} checked={asma} />Asma<br />
                </fieldset>
                <input type="submit" value="Sacar Turno" className="u-full-width button-primary"></input>
            </form>
        </>
    );
}

export default Formulario;