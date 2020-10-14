import React from 'react';
import { Shoes } from './Shoes'
import styled from 'styled-components'

function App() {
  return (
    <Main>
      <h1>PUMPED</h1>
      <h2>Shoes</h2>

      <Shoes />
    </Main>
  );
}

const Main = styled.div`

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 20px;
  padding: 20px;

`;

export default App;
