import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import PUMPEDimg from "../assets/PUMPED.png";

export default function Navbar() {
  return (
    <Container>
      <StyledHeader>
        <div></div>
        <Link to="/" style={{ textDecoration: "none" }}>
          <PUMPEDContainer>
            <PUMPED src={PUMPEDimg} />
          </PUMPEDContainer>
        </Link>
        <List>
          <Item>
            <Link to={"/cart"}>
              <h3>Cart</h3>
            </Link>
          </Item>
          <Item>
            <Link to={"/wishlist"}>
              <h3>Wishlist</h3>
            </Link>
          </Item>
          <Item>
            <Link to={"/me"}>
              <h3>Me</h3>
            </Link>
          </Item>
        </List>
      </StyledHeader>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledHeader = styled.header`
  display: inline-grid;
  grid-template-columns: 200px auto 200px;

  @media (max-width: 1040px) {
    grid-template-columns: auto;
    grid-template-rows: 0 auto auto;
  }
`;

const List = styled.ul`
  display: inline-flex;
  list-style-type: none;
  align-items: center;

  @media (max-width: 1040px) {
    justify-content: center;
    padding: 0;
    margin-top: 0;
  }
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
