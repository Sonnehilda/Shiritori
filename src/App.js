import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import GlobalStyle from "./style/app";
import * as P from "./pages/index";
import "./App.css";

import Footer from "./components/Footer";
import Wrapper from "./components/Wrapper";

function App() {
  const location = useLocation();

  const TransitionedPage = (WrappedComponent) => {
    return (
      <TransitionGroup component={null}>
        <CSSTransition
          key={location.pathname}
          classNames="fade"
          timeout={500}
          unmountOnExit
          //appear
          exit={false}
        >
          <WrappedComponent />
        </CSSTransition>
      </TransitionGroup>
    );
  };

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <Routes location={location}>
          <Route exact path="/" element={TransitionedPage(P.Home)} />
          <Route exact path="/play" element={TransitionedPage(P.Play)} />
          <Route
            exact
            path="/settings"
            element={TransitionedPage(P.Settings)}
          />
          <Route exact path="/about" element={TransitionedPage(P.About)} />
        </Routes>
      </Wrapper>
      <Footer />
    </>
  );
}

export default App;
