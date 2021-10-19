import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import Login from '../components/Login';

const errorInicial = {
  error: false,
  mensaje: "",
  bgColor: ""
}

function LoginPage() {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(errorInicial);
  const [usuarios, setUsuarios] = useState([]);
  const history = useHistory();

  useEffect(() => {
    // setLoading(true);
    // fetch(URL)
    //   .then((res) => {
    //     return res.ok ? res.json() : Promise.reject(res);
    //   })
    //   .then((data) => {
    //     setCocineros(data);
    //     setLoading(false);
    //     setError(errorInicial);
    //   })
    //   .catch((error) => {
    //     setLoading(false);
    //     let statusText = error.statusText || "Ocurrio un error";
    //     setError({
    //       error: true,
    //       mensaje: `Error: ${error.status} - ${statusText}`,
    //       bgColor: "red"
    //     });
    //   });
  }, []);

  const altaUser = (nuevoUser) => {
    setLoading(true);
    //aglcaramos en el header lo que qeuremos amndarle por el body 
    const options = {
      method: "POST",
      headers: {
        "Content-type": "application/json;charset=utf-8"
      },
      body: JSON.stringify(nuevoUser)
    };
    fetch('http://localhost:5000/api/users/', options)
      .then(result => {
        return result.ok ? result.json() : Promise.reject(result)
      })
      .then((data) => {
        setUsuarios([...usuarios, data]);
        setLoading(false);
        setError(errorInicial);
      })
      .catch((error) => {
        setLoading(false);
        let statusText = error.statusText || "Ocurrio un error";
        setError({
          error: true,
          mensaje: `Error: ${error.status} - ${statusText}`,
          bgColor: "red"
        });
      })
  };

  const getToken = (nuevoToken) => {
    // console.log(nuevoToken);
    setLoading(true);
    //aglcaramos en el header lo que qeuremos amndarle por el body 
    const options = {
      method: "POST",
      headers: {
        "Content-type": "application/json;charset=utf-8"
      },
      body: JSON.stringify(nuevoToken)
    };
    fetch("http://localhost:5000/api/login", options)
      .then(result => {
        return result.ok ? result.json() : Promise.reject(result)
      })
      .then((data) => {
        // console.log(data);
        localStorage.setItem('tokenLogin', data.token);
        // this.setState({ redirect: "/tabla" });
        history.push("/tabla");
        // history.pushState(null, 'tabla');
        // setLoading(false);
        // setError(errorInicial);
      })
      .catch((error) => {
        setLoading(false);
        let statusText = error.statusText || "Ocurrio un error";
        setError({
          error: true,
          mensaje: `Error: ${error.status} - ${statusText}`,
          bgColor: "red"
        });
      })
  };

  return (
    <div>
      <Login
        altaUser={altaUser}
        getToken={getToken}
      > </Login>
    </div>
  );
}

export default LoginPage;