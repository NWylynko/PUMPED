import React from "react";
import { Switch, Route, useLocation } from "react-router-dom";
import Navbar from "./components/navbar";
import styled from "styled-components";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import IndexPage from "./pages/index";
import ShoePage from "./pages/shoe";
import CartPage from "./pages/cart";
import MePage from "./pages/me";
import WishlistPage from "./pages/wishlist";

export default function Navigation() {
  let location = useLocation();

  return (
    <>
      <Navbar />
      <TransitionGroup>
        <CSSTransition key={location.key} classNames="fade" timeout={300}>
          <Switch location={location}>
            <Route path="/cart" component={CartPage} />
            <Route path="/me" component={MePage} />
            <Route path="/wishlist" component={WishlistPage} />
            <Route path="/shoe/:id" component={ShoePage} />
            <Route path="/" component={IndexPage} />
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    </>
  );
}

// const Main = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
// `;

// const Page = styled.main`
//   margin: 20px;
//   padding: 20px;
//   min-height: 101vh;
// `;
