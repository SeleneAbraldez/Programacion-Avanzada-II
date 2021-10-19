import React from 'react';
import Header from './componentes/Header';
import Formulario from "./componentes/Formulario"
import styled from '@emotion/styled';

const ContenedorStyled = styled.div`
  max-width:800px;
  margin: 0 auto;
`;

function App() {
  return (
    <div>
      <ContenedorStyled>
        <Header titulo="Cotizador de Seguros" />
        <Formulario />
      </ContenedorStyled>
    </div>
  );
}

export default App;
