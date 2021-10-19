import React from 'react';
import logo from "../assets/logo.png"

const Header = ({ title }) => {
    return (
        <header>
        {/* <header style={{backgroundColor: "lightgrey"}}> */}
            <img src={logo} alt="vegan"></img>
            <h1>{title}</h1>
        </header>
    );
}

export default Header;