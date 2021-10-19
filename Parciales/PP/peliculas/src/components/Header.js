import React from 'react';
import logo from "../assets/cinema.png"
// import logo from "../assets/logo.png"

const Header = ({ children }) => {

    const style = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        background: "linear-gradient(#e66465, #9198e5)",
        padding:"1rem"
    }

    return (
        <>
            <header style={style}>
            {/* <img style={style2} src={logo} alt="logo pelicula" ></img> */}
                <img src={logo} alt="logo pelicula" style={{height:"200px", borderRadius: "1rem"}}></img>
                <h1 className="title">{children}</h1>
            </header>
        </>
    );
}

export default Header;