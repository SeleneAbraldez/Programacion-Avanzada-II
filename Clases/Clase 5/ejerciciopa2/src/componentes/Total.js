//callback guarod el 0 en act, le sumo los 21, ahora 0 es el ant, le sumo 15 etc
const Total = ({ carreras }) => {
    return (
        <p>
            Cantidad de Materias: {carreras.reduce((ant, actual) => ant + actual.cantMaterias, 0)}
        </p>
    );
}

export default Total;