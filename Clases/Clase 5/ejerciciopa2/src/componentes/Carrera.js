const Carrera = ({ carrera }) => {
    let { nombre, cantidad } = carrera;
    return (
        <p>
            {nombre}: {cantidad}
        </p>
    );
}

export default Carrera;