import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import PUMPEDimg from './PUMPED.png'

export default function Navbar() {
  return (
    <header>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <PUMPEDContainer>
          <PUMPED src={PUMPEDimg} />
        </PUMPEDContainer>
      </Link>

    </header>
  )
}

const PUMPED = styled.img`
  max-height: 300px;
`;

const PUMPEDContainer = styled.div`

justify-content: center;
align-items: center;
display: inline-flex;

  animation: slideup 2s ease-in-out;

  @keyframes slideup {
    from {
      height: 100vh;
    }

    to {
      height: 300px;
    }
  }
`;