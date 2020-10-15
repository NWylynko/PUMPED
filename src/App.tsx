import React from 'react';
import { Shoes } from './Shoes'
import styled from 'styled-components'
import { useQuery } from "react-query";
import { getShoes } from './api'

function App() {

  const { isLoading, error, data } = useQuery("shoes", getShoes);

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>error</p>
  }

  return (
    <Main>
      <PUMPED>PUMPED</PUMPED>

      <Shoes data={data} />
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

const PUMPED = styled.h1`
  font-family: sporty-pro-inline, sans-serif;
  font-weight: 900;
  font-style: normal;

  font-size: 4em;

  background-color: #ff0000;
  color: #fff;

  margin: 20px;
  padding: 20px;
`;

export default App;
