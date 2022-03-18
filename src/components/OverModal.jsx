import React from "react";
import * as S from "../style/over";

import Hover from "../sfx/hover.mp3";
import Click from "../sfx/click.mp3";

const OverModal = React.memo(function OverModal({ setOverVisible }) {
  const HoverSFX = new Audio(Hover);
  const ClickSFX = new Audio(Click);

  const lang = localStorage.getItem("language")
    ? localStorage.getItem("language")
    : "EN";

  const savedSfxVolume = localStorage.getItem("sfxvolume");
  const savedSfxToggle = "" + localStorage.getItem("sfxtoggle");

  HoverSFX.volume = savedSfxVolume / 100;
  ClickSFX.volume = savedSfxVolume / 100;

  const onHover = () => {
    if (savedSfxToggle === "true") {
      HoverSFX.pause();
      HoverSFX.currentTime = 0;
      HoverSFX.play();
    }
  };

  const onClick = () => {
    if (savedSfxToggle === "true") {
      ClickSFX.pause();
      ClickSFX.currentTime = 0;
      ClickSFX.play();

      setOverVisible(false);
    }
  };

  return (
    <S.Wrapper>
      <S.Close onMouseEnter={onHover} onClick={onClick}>
        ×
      </S.Close>
      <S.MainTitle>
        {lang === "KR" ? "게임이 종료되었습니다!" : "Game Over!"}
      </S.MainTitle>
      <S.TextWrapper>
        <S.SubTitle>{lang === "KR" ? "당신의 점수" : "Your Score"}</S.SubTitle>
        <S.Score>
          {localStorage.getItem("score") ? localStorage.getItem("score") : 0}
        </S.Score>
      </S.TextWrapper>
    </S.Wrapper>
  );
});

export default OverModal;
