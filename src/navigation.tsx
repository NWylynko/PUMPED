import React from "react";
import { Switch, Route, useLocation } from "react-router-dom";
import Navbar from "./components/navbar";
import styled from "styled-components";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import IndexPage from "./pages/index";
import ShoePage from "./pages/shoe";
// import CartPage from "./pages/shoe";
// import MePage from "./pages/shoe";
// import OrderPage from "./pages/shoe";
// import WishlistPage from "./pages/shoe";

export default function Navigation() {
  let location = useLocation();

  return (
    <>
      <Main>
        <Navbar />
        <TransitionGroup>
          <CSSTransition key={location.key} classNames="fade" timeout={300}>
            <Switch location={location}>
              {/* <Route path="/shoe/:id" component={ShoePage} /> */}
              <Route path="/shoe/:id">
                <ShoePage />
              </Route>
              {/* <Route path="/" component={IndexPage} /> */}
              <Route path="/">
                <IndexPage />
              </Route>
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      </Main>
    </>
  );
}

const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 20px;
  padding: 20px;
`;
