import React, { useEffect } from "react";
import * as S from "../style/home";
import Music from "../bgm/Theme.mp3";
import Click from "../sfx/click.mp3";

const HomePage = React.memo(function HomePage() {
  const BGM = new Audio(Music);
  let currentTime = 0;

  useEffect(() => {
    BGM.volume = 0.75;

    playGame();
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
    BGM.loop = true;
    BGM.currentTime = currentTime;
    BGM.play();
  };

  const pauseGame = () => {
    BGM.pause();
    currentTime = BGM.currentTime;
  };

  return (
    <S.Wrapper>
      <S.Logo to="/">Shiritori</S.Logo>
      <S.Button to="/play">PLAY</S.Button>
      <S.Button to="/settings">SETTINGS</S.Button>
      <S.Button to="/about">ABOUT</S.Button>
    </S.Wrapper>
  );
});

export default React.memo(HomePage);
