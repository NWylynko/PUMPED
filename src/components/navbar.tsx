import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import PUMPEDimg from '../assets/PUMPED.png'

export default function Navbar() {
  return (
    <StyledHeader>
      <div></div>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <PUMPEDContainer>
          <PUMPED src={PUMPEDimg} />
        </PUMPEDContainer>
      </Link>
      <List>
        <Item><Link to={'/'}><h3>Cart</h3></Link></Item>
        <Item><Link to={'/'}><h3>Wishlist</h3></Link></Item>
        <Item><Link to={'/'}><h3>Me</h3></Link></Item>
      </List>
    </StyledHeader>
  )
}

const StyledHeader = styled.header`
  display: inline-grid;
  grid-template-columns: 200px auto 200px;
`;

const List = styled.ul`
  display: inline-flex;
  list-style-type: none;
  align-items: center;
`;

const Item = styled.li`
  margin: 3px;
  padding: 3px;
`;

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