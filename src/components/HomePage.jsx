import React, { useEffect } from "react";
import * as S from "../style/home";
import Hover from "../sfx/hover.mp3";
import Click from "../sfx/click.mp3";
import Play from "../sfx/play.mp3";

const HomePage = React.memo(function HomePage() {
  const HoverSFX = new Audio(Hover);
  const ClickSFX = new Audio(Click);
  const PlaySFX = new Audio(Play);

  const hoverSound = () => {
    HoverSFX.pause();
    HoverSFX.currentTime = 0;
    HoverSFX.play();
  };

  const clickSound = (e) => {
    if (e.target.text === "PLAY") {
      PlaySFX.pause();
      PlaySFX.currentTime = 0;
      PlaySFX.play();
    } else {
      ClickSFX.pause();
      ClickSFX.currentTime = 0;
      ClickSFX.play();
    }
  };

  return (
    <S.Wrapper>
      <S.Logo to="/">Shiritori</S.Logo>
      <S.Button onMouseEnter={hoverSound} onClick={clickSound} to="/play">
        PLAY
      </S.Button>
      <S.Button onMouseEnter={hoverSound} onClick={clickSound} to="/settings">
        SETTINGS
      </S.Button>
      <S.Button onMouseEnter={hoverSound} onClick={clickSound} to="/about">
        ABOUT
      </S.Button>
    </S.Wrapper>
  );
});

export default React.memo(HomePage);
