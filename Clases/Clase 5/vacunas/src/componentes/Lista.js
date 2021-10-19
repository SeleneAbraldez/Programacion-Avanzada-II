import Vacuna from "../componentes/Vacuna";

const Lista = ({ titulo, vacunas, setCarrito, carrito }) => {
    return (
        <div className="lista">
            <h2>{titulo}</h2>
            <div className="lista">
                {vacunas.map(vacuna =>
                    <Vacuna
                        key={vacuna.id}
                        vacuna={vacuna}
                        setCarrito={setCarrito}
                        vacunas={vacunas}
                        carrito={carrito}
                    />)}
            </div>
        </div>
    );
}

export default Lista;