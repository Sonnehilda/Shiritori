import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GlobalStyle from "./style/app";
import * as P from "./pages/index";

function App() {
  return (
    <Router>
      <GlobalStyle />
      <Routes>
        <Route exact="true" path="/" element={<P.Home />} />
        <Route exact="true" path="/Play" element={<P.Play />} />
      </Routes>
    </Router>
  );
}

export default App;
