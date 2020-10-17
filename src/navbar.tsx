import React from 'react'
import styled from 'styled-components'

export default function Navbar() {
  return (
    <header>
      <PUMPED>PUMPED</PUMPED>

    </header>
  )
}

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

