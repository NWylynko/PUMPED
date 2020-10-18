import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Navbar from "./navbar";
import styled from 'styled-components'

import Home from './Home'
import { ShoePage } from "./ShoePage";

export default function Navigation() {
  return (
    <Router>
      <Main>
      <Navbar />
      <Switch>
        <Route path="/about">
          <ShoePage />
        </Route>
        <Route path="/shoe/:id" children={<ShoePage />} />
        <Route path="/">
          <Home />
        </Route>
      </Switch>
      </Main>
    </Router>
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

