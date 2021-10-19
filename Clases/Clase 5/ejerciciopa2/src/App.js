import Header from "./componentes/Header";
import Content from "./componentes/Content";
import Total from "./componentes/Total";

const App = ({ facultad }) => {

    const { titulo, carreras } = facultad;
  
    return (
      <div>
        <Header titulo={titulo} />
        <Content carreras={carreras} />
        <Total carreras={carreras} />
      </div>
  
    );
  }

  export default App;