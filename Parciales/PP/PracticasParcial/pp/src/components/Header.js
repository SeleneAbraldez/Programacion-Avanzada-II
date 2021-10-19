import React from 'react';
import logo from "../assets/logo.png"
import calendar from '../assets/calendar.png';
import tarot from '../assets/tarot.png';
import translate from '../assets/translate.png';
import crystal from '../assets/crystal-ball.png';

const Header = ({ title }) => {
    return (
        <header>
            <img src={logo} alt="logo pokebola" />
            <h1>{title}</h1>
            <div className="botones">
                <button>
                    <img src={translate} alt="flecha prev" /> Registrar Tirada
                </button>
                <button>
                    <img src={tarot} alt="flecha prev" /> Todas las cartas
                </button>
                <button>
                    <img src={crystal} alt="flecha prev" /> Ver Significados
                </button>
            </div>
        </header>
    );
}

export default Header;