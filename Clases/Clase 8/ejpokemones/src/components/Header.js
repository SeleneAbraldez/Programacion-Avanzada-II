import React from 'react';
import logo from "../assets/logo2.png"
import BotonNext from './BotonNext';
import BotonPrev from './BotonPrev';

const Header = ({ title, handlerPrev, handlerNext }) => {
    return (
        <header>
            <img src={logo} alt="logo pokebola" />
            <h1>{title}</h1>
            <div className="botones">
                <BotonPrev handlerClick={handlerPrev}></BotonPrev>
                <BotonNext handlerClick={handlerNext}></BotonNext>
            </div>

        </header>
    );
}

export default Header;