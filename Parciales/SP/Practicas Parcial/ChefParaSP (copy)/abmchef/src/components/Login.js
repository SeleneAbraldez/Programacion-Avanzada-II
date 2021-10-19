import React, { useState, useEffect } from 'react';

const formInicual = {
    username: '', password: '',
};

const Login = ({altaUser, getToken}) => {

    const [form, setForm] = useState(formInicual);
    const { username, password } = form;
    const [esRegistro, setEsRegistro] = useState(false);

    const handlerChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    };

    const handlerSubmit = (e) => {
        e.preventDefault();
        if (username.trim() === "" || password.trim() === "") {
            alert("Datos Incompletos!!");
            return;
        }
        console.log(username, password);

        if(esRegistro){
            getToken(form)
        }else{
            altaUser(form)
        }

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
    }


    return (
        <div class="login-page">
            <div class="form">
                <form class="login-form">
                    <input type="text" name="username" value={username} onChange={handlerChange} placeholder="username" />
                    <input type="password" name="password" value={password} onChange={handlerChange} placeholder="password" />
                    <input class="buttonSum" type="submit" onClick={handlerSubmit} value={esRegistro ? 'Login' : 'Registrarse'} />
                    <input class="message" onClick={() => cambiarVista()} value={esRegistro ? 'No esta registrado? Cree una cuenta' : 'Ya esta registrado? Ingrese'} />
                </form>
            </div>
        </div>
    );
}

export default Login;