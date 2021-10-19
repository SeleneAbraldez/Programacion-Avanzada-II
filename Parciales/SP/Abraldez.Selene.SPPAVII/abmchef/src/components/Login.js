import React, { useState } from 'react';

const formInicual = {
    username: '', password: '',
};

const Login = ({altaUser, getToken}) => {

    const [form, setForm] = useState(formInicual);
    const { username, password } = form;
    const [esRegistro, setEsRegistro] = useState(false);
    const [error, setError] = useState("");

    const handlerChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    };

    const handlerSubmit = (e) => {
        e.preventDefault();
        if (username.trim() === "" || password.trim() === "") {
            setError("Datos Incompletos")
            return;
        }
        // console.log(username, password);

        if(esRegistro){
            // console.log(getToken(form));
            setError("Data incorrecta")
            getToken(form)
        }else{
            altaUser(form)
            setError("Alta con exito! Ahora que se ha regitrado puede loguearse ↧")
        }

        // console.log();

        // esRegistro ? altaUser(form) :
        //     getToken(form);

        handlerReset();
    }

    const handlerReset = (e) => {
        setForm(formInicual);
    }

    const cambiarVista = (event) => {
        // console.log(esRegistro);
        setEsRegistro(!esRegistro);
        setError("")
    }


    return (
        <div className="login-page">
            <div className="form">
                <form className="login-form">
                    <input type="text" name="username" value={username} onChange={handlerChange} placeholder="username" />
                    <input type="password" name="password" value={password} onChange={handlerChange} placeholder="password" />
                    <input className="buttonSum" type="submit" onClick={handlerSubmit} value={esRegistro ? 'Login' : 'Registrarse'} />
                    { error ? <p>{error}</p> : ""}
                    <input className="message" onClick={() => cambiarVista()} value={esRegistro ? 'No esta registrado? Cree una cuenta' : 'Ya esta registrado? Ingrese'} />
                </form>
            </div>
        </div>
    );
}

export default Login;