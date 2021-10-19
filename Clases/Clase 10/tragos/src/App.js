import Formulario from "./components/Formulario";
import Header from "./components/Header";
import Lista from "./components/Lista";
import CategoriasProvider from "./context/CategoriasContext";
import CoctelesProvider from "./context/CoctelesContext";
import ModalProvider from "./context/ModalContext";

function App() {
  return (
    <CategoriasProvider>
      <CoctelesProvider>
        <ModalProvider>
          <Header></Header>
          <div className="container">
            <Formulario></Formulario>
            <div className="row">
              <Lista></Lista>
            </div>
          </div>
        </ModalProvider>
      </CoctelesProvider>
    </CategoriasProvider>
  );
}

export default App;
