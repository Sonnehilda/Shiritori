import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import GlobalStyle from "./style/app";
import * as P from "./pages/index";
import "./App.css";

import HomeMusic from "./bgm/Theme.mp3";
import PlayMusic from "./bgm/Game.mp3";

function App() {
  const location = useLocation();

  const HomeBGM = new Audio(HomeMusic);
  const PlayBGM = new Audio(PlayMusic);

  const [page, setPage] = useState("Home");
  let currentTime = 0;

  useEffect(() => {
    playGame(page);
    HomeBGM.volume = 0.75;
    PlayBGM.volume = 0.75;
    window.addEventListener("focus", playGame);
    window.addEventListener("blur", pauseGame);
    return () => {
      window.removeEventListener("focus", playGame);
      window.removeEventListener("blur", pauseGame);
      pauseGame();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const playGame = () => {
    if (page === "Home") {
      HomeBGM.loop = true;
      HomeBGM.currentTime = currentTime;
      HomeBGM.play();
    }
    if (page === "Play") {
      PlayBGM.loop = true;
      PlayBGM.currentTime = currentTime;
      PlayBGM.play();
    }
  };

  const pauseGame = () => {
    if (page === "Home") {
      currentTime = HomeBGM.currentTime;
      HomeBGM.pause();
    }
    if (page === "Play") {
      currentTime = PlayBGM.currentTime;
      PlayBGM.pause();
    }
  };

  const toggleMusic = (e) => {
    if (e.children[0].text === "Shiritori") {
      setPage("Home");
      playGame("Home");

      HomeBGM.volume = 0.0682;

      const VolumeIn = setInterval(() => {
        HomeBGM.volume = HomeBGM.volume + 0.0682;
        if (HomeBGM.volume >= 0.75) {
          HomeBGM.volume = 0.75;
          clearInterval(VolumeIn);
        }
      }, 100);
    } else {
      setPage("Play");
      playGame("Play");

      PlayBGM.volume = 0.0682;

      const VolumeIn = setInterval(() => {
        PlayBGM.volume = PlayBGM.volume + 0.0682;
        if (PlayBGM.volume >= 0.75) {
          PlayBGM.volume = 0.75;
          clearInterval(VolumeIn);
        }
      }, 100);
    }
  };

  const toggleHomeBGM = () => {
    HomeBGM.volume = HomeBGM.volume - 0.0682;
    const VolumeOut = setInterval(() => {
      HomeBGM.volume = HomeBGM.volume - 0.0682;
      if (HomeBGM.volume <= 0.0682) {
        HomeBGM.volume = 0;
        HomeBGM.pause();
        clearInterval(VolumeOut);
      }
    }, 100);
  };

  const togglePlayBGM = () => {
    PlayBGM.volume = PlayBGM.volume - 0.0682;
    const VolumeOut = setInterval(() => {
      PlayBGM.volume = PlayBGM.volume - 0.0682;
      console.log(PlayBGM.volume);
      if (PlayBGM.volume <= 0.0682) {
        console.log("PAUSED");
        PlayBGM.volume = 0;
        PlayBGM.pause();
        clearInterval(VolumeOut);
      }
    }, 100);
  };

  const onExit = () => {
    toggleHomeBGM();
    togglePlayBGM();
  };

  return (
    <>
      <GlobalStyle />
      <TransitionGroup component={null}>
        <CSSTransition
          onExit={onExit}
          onEntered={toggleMusic}
          key={location.key}
          classNames="fade"
          timeout={500}
        >
          <Routes location={location}>
            <Route exact path="/" element={<P.Home />} />
            <Route exact path="/play" element={<P.Play />} />
          </Routes>
        </CSSTransition>
      </TransitionGroup>
    </>
  );
}

export default App;
