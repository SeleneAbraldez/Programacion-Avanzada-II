import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navegacion = () => {
    return (
        <nav>
            <ol>
                <li>
                    <span>Enlaces Clasicos</span>
                    <a href="/contacto">Contacto</a>
                    <a href="/acerca">Acerca</a>
                    <a href="/">Home</a>
                </li>
                <li>
                    <span>Componentes Link</span>
                    <Link to="/contacto">Contacto</Link>
                    <Link to="/acerca">Acerca</Link>
                    <Link to="/">Home</Link>
                    <Link to="/about">About</Link>
                    <Link to="/usuario/Juan/30/juancto@gmail.com">Juan</Link>
                    {/* <Link to="/usuario/:nombre/:edad/:email">Usuario</Link> */}
                    <Link to="/producto/?id=1000">Producto 1000</Link>
                </li>
                <li>
                    <span>Componentes NavLink</span>
                    {/* class list add por detras, la diferencia con link solo */}
                    <NavLink activeClassName="active" to="/contacto">Contacto</NavLink>
                    <NavLink activeClassName="active" to="/acerca">Acerca</NavLink>
                    {/* exact para que no suceda lo mismo qe antes, entra dentro de la def de / y se pintan ambos si no */}
                    <NavLink activeClassName="active" exact to="/">Home</NavLink>
                </li>
            </ol>
        </nav>
    );
}

export default Navegacion;