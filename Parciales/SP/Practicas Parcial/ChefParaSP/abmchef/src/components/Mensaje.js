import React from 'react';


const Mensaje = ({ children, bgColor = "blue", colorLetra }) => {

    const miEstilo = {
        "textAlign": "center"
    }

    return (
        <>
            <div style={{ ...{ backgroundColor: bgColor }, ...miEstilo }}>
                <h2 style={{ color: colorLetra }}>
                    {children}
                </h2>
            </div>
        </>
    );
}

export default Mensaje;