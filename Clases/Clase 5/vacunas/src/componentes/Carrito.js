import Vacuna from "../componentes/Vacuna";
import shortid from "shortid";

const Carrito = ({ titulo, setCarrito, carrito }) => {
    return (
        <div className="carrito">
            <h2>{titulo}</h2>
            <div className="carrito">
                {carrito.map(vacuna =>
                    <Vacuna
                        key={shortid.generate()}
                        vacuna={vacuna}
                        setCarrito={setCarrito}
                        carrito={carrito}
                    />)}
            </div>
        </div>
    );
}

export default Carrito;