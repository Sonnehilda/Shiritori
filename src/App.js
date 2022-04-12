import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import GlobalStyle from "./styles/index";
import "./App.css";

import Footer from "./components/Footer";
import Wrapper from "./components/Wrapper";

import HomePage from "./pages/Home";
import PlayPage from "./pages/Play";
import SettingsPage from "./pages/Settings";
import AboutPage from "./pages/About";

function App() {
  return (
    <Router>
      <GlobalStyle />
      <Wrapper>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/play" element={<PlayPage />} />
          <Route exact path="/settings" element={<SettingsPage />} />
          <Route exact path="/about" element={<AboutPage />} />
        </Routes>
      </Wrapper>
      <Footer />
    </Router>
  );
}

export default App;
