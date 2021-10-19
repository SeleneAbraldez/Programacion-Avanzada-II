const Vacuna = ({ vacuna, setCarrito, vacunas, carrito }) => {

    const { id, marca, precio } = vacuna;

    const agregarVacuna = (id) => {
        console.log("Comprando... " + id);
        setCarrito([...carrito, ...vacunas.filter((vacuna) => vacuna.id === id)]);
    }

    const eliminarVacuna = (id) => {
        console.log("Eliminando... " + id);
        const indice = carrito.findIndex(v => v.id === id);
        const auxCarrito = [...carrito];
        auxCarrito.splice(indice, 1);
        setCarrito(auxCarrito);
    }

    return (
        <div>
            <h3>{marca}</h3>
            <p><b>Precio:</b>${precio}</p>
            {
                vacunas ?
                    <button type="button"
                        onClick={() => {
                            agregarVacuna(id);
                        }}
                    >Comprar</button>
                    :
                    <button type="button"
                        onClick={() => {
                            eliminarVacuna(id);
                        }}
                    >Eliminar</button>
            }

        </div>
    );
}

export default Vacuna;