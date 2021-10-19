import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Acerca from './pages/Acerca';
import Contacto from './pages/Contacto';
import Navegacion from './components/Navegacion.js';
import Error404 from './pages/Error404.js';
import "bulma/css/bulma.css";
import Usuario from './pages/Usuario';
import Producto from './pages/Producto';

function App() {
  return (
    <div >
      <h1>React Router</h1>
      <Router>
        {/* <Navegacion></Navegacion> */}
        {/* Con el switch machea primero con el home /, entonced hay que mandarlo al final al mas general 
        o utilizar el exact en el general y dejar a los particulares libres*/}
        <Switch>
          <Route path="/acerca">
            <h3>Esto es un titulo</h3>
            <Acerca />
          </Route>
          <Route path="/contacto" children={<><Contacto /><p>Lorem blabla</p></>} />
          <Route exact path="/" component={Home} />
          <Route path="/usuario/:nombre/:edad/:email" component={Usuario} />
          <Route path="/producto" component={Producto} />
          <Route path="/about">
            <Redirect to="/acerca" />
          </Route>
          <Route path="*" component={Error404} />
        </Switch>
        {/* Va sumando porque no esta en exact, pòrque esta dentro, para evitar usar el exacr antes de path
         <Route path="/acerca/contacto" component={Home} /> */}
      </Router>
    </div>
  );
}

export default App;
