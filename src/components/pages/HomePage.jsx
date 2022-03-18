import React, { useEffect } from "react";
import * as S from "../../style/home";

import Theme from "../../bgm/theme.mp3";
import Hover from "../../sfx/hover.mp3";
import Click from "../../sfx/click.mp3";
import Play from "../../sfx/play.mp3";

const HomePage = React.memo(function HomePage() {
  const BGM = new Audio(Theme);
  const HoverSFX = new Audio(Hover);
  const ClickSFX = new Audio(Click);
  const PlaySFX = new Audio(Play);

  const lang = localStorage.getItem("language")
    ? localStorage.getItem("language")
    : "EN";

  const savedBgmVolume = localStorage.getItem("bgmvolume")
    ? localStorage.getItem("bgmvolume")
    : 75;
  const savedSfxVolume = localStorage.getItem("sfxvolume")
    ? localStorage.getItem("sfxvolume")
    : 75;
  const savedBgmToggle = "" + localStorage.getItem("bgmtoggle");
  const savedSfxToggle = "" + localStorage.getItem("sfxtoggle");

  BGM.loop = true;
  BGM.volume = savedBgmVolume / 100;
  HoverSFX.volume = savedSfxVolume / 100;
  ClickSFX.volume = savedSfxVolume / 100;
  PlaySFX.volume = savedSfxVolume / 100;

  useEffect(() => {
    onFocus();
    if (savedBgmToggle === "true") BGM.play();
    window.addEventListener("focus", onFocus);
    window.addEventListener("blur", onBlur);
    window.addEventListener("mousemove", onFirstJoin);
    return () => {
      onBlur();
      BGM.pause();
      window.removeEventListener("focus", onFocus);
      window.removeEventListener("blur", onBlur);
      window.removeEventListener("mousemove", onFirstJoin);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onFocus = () => {
    BGM.volume = savedBgmVolume / 100;
  };

  const onBlur = () => {
    BGM.volume = 0;
  };

  const onFirstJoin = () => {
    window.removeEventListener("mousemove", onFirstJoin);
    if (savedBgmToggle === "true") BGM.play();
  };

  const onHover = () => {
    if (savedSfxToggle === "true") {
      HoverSFX.pause();
      HoverSFX.currentTime = 0;
      HoverSFX.play();
    }
  };

  const onClick = (e) => {
    if (savedSfxToggle === "true") {
      const text = e.target.text;
      if (
        text === "PLAY" ||
        text === "Shiritori" ||
        text === "시작" ||
        text === "시리토리"
      ) {
        PlaySFX.pause();
        PlaySFX.currentTime = 0;
        PlaySFX.play();
      } else {
        ClickSFX.pause();
        ClickSFX.currentTime = 0;
        ClickSFX.play();
      }
    }
  };

  return (
    <>
      <S.Logo onClick={onClick} to="/">
        {lang === "KR" ? "시리토리" : "Shiritori"}
      </S.Logo>
      <S.Button onClick={onClick} onMouseEnter={onHover} to="/play">
        {lang === "KR" ? "시작" : "PLAY"}
      </S.Button>
      <S.Button onClick={onClick} onMouseEnter={onHover} to="/settings">
        {lang === "KR" ? "설정" : "SETTINGS"}
      </S.Button>
      <S.Button onClick={onClick} onMouseEnter={onHover} to="/about">
        {lang === "KR" ? "소개" : "ABOUT"}
      </S.Button>
    </>
  );
});

export default React.memo(HomePage);
