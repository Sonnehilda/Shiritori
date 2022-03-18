import React, { useEffect, useState } from "react";
import * as S from "../../style/about";

import Theme from "../../bgm/theme.mp3";
import Hover from "../../sfx/hover.mp3";
import Click from "../../sfx/click.mp3";
import Play from "../../sfx/play.mp3";

const AboutPage = React.memo(function AboutPage() {
  const BGM = new Audio(Theme);
  const HoverSFX = new Audio(Hover);
  const ClickSFX = new Audio(Click);
  const PlaySFX = new Audio(Play);

  const lang = localStorage.getItem("language")
    ? localStorage.getItem("language")
    : "EN";

  const [alert, setAlert] = useState(
    lang === "KR" ? "클릭하여 복사합니다." : "Click Here to Copy!"
  );

  const savedBgmVolume = parseInt(localStorage.getItem("bgmvolume"));
  const savedSfxVolume = parseInt(localStorage.getItem("sfxvolume"));
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
      const text = e.target.innerText;
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

        if (text.includes("rals")) {
          navigator.clipboard.writeText("rals#1031");
          setAlert(lang === "KR" ? "복사되었습니다!" : "Copied!");
        } else if (text.includes("winhave")) {
          navigator.clipboard.writeText("winhave@naver.com");
          setAlert(lang === "KR" ? "복사되었습니다!" : "Copied!");
        }
      }
    }
  };

  const onMouseLeave = () => {
    if (alert !== "Click Here to Copy!" && "클릭하여 복사합니다.")
      setAlert(lang === "KR" ? "클릭하여 복사합니다." : "Click Here to Copy!");
  };

  return (
    <>
      <S.Logo onClick={onClick} to="/">
        {lang === "KR" ? "시리토리" : "Shiritori"}
      </S.Logo>
      <S.PhraseWrapper>
        <S.Phrase>
          <span>{lang === "KR" ? "시리토리" : "Shiritori"}</span>
          {lang === "KR"
            ? "는 영어 끝말잇기 게임입니다."
            : ", The English Word Chain Game."}
        </S.Phrase>
        <div></div>
        <S.Phrase>
          <span>{lang === "KR" ? "끝말잇기" : "Word Chain"}</span>
          {lang === "KR"
            ? "는 한 사람이 먼저 한"
            : " is a game in which players"}
        </S.Phrase>
        <S.Phrase>
          {lang === "KR"
            ? "낱말을 말하면 다음 사람이 그"
            : "come up with words that begin with the"}
        </S.Phrase>
        <S.Phrase>
          {lang === "KR"
            ? "낱말의 끝 음절을 첫소리로 하는"
            : "letter or letters that the previous word"}
        </S.Phrase>
        <S.Phrase>
          {lang === "KR" ? "낱말을 말하는 식으로 다음 사람으로" : "ended with."}
        </S.Phrase>
        {lang === "KR" && <S.Phrase>계속 이어 가는 놀이입니다.</S.Phrase>}
        <div></div>
        <S.Desc>{lang === "KR" ? "사용된 음악" : "Music Used"}</S.Desc>
        <S.Desc>
          {lang === "KR"
            ? "좀비고등학교 - 학교 생활 메인 테마"
            : "ZHS - School Life Theme"}
        </S.Desc>
        <S.Desc>
          {lang === "KR" ? "좀비고등학교 - 카페테리아" : "ZHS - Cafeteria"}
        </S.Desc>
      </S.PhraseWrapper>
      <S.PhraseWrapper>
        <S.Phrase>{lang === "KR" ? "연락처" : "Contact"}</S.Phrase>
        <S.Copyable
          alert={alert}
          onClick={onClick}
          onMouseEnter={onHover}
          onMouseLeave={onMouseLeave}
        >
          {lang === "KR" ? "디스코드" : "Discord"} : rals#1031
        </S.Copyable>
        <S.Copyable
          alert={alert}
          onClick={onClick}
          onMouseEnter={onHover}
          onMouseLeave={onMouseLeave}
        >
          {lang === "KR" ? "이메일" : "E-Mail"} : winhave@naver.com
        </S.Copyable>
      </S.PhraseWrapper>
    </>
  );
});

export default AboutPage;
