const Footer = ({ titulo }) => {

    const anio = new Date().getFullYear();
    return (
        <footer>
            <p>Todos los derechos reservados {anio} &copy;</p>
        </footer>
    );
}

export default Footer;