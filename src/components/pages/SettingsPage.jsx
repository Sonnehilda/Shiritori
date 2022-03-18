import React, { useState, useEffect, useRef } from "react";
import * as S from "../../style/settings";

import Theme from "../../bgm/theme.mp3";
import Hover from "../../sfx/hover.mp3";
import Click from "../../sfx/click.mp3";
import Play from "../../sfx/play.mp3";

const SettingsPage = React.memo(function SettingsPage() {
  const savedBackgroundColor1 = localStorage.getItem("backgroundcolor1");
  const savedBackgroundColor2 = localStorage.getItem("backgroundcolor2");
  const savedBgmVolume = localStorage.getItem("bgmvolume")
    ? localStorage.getItem("bgmvolume")
    : 75;
  const savedSfxVolume = localStorage.getItem("sfxvolume")
    ? localStorage.getItem("sfxvolume")
    : 75;
  let savedBgmToggle = "" + localStorage.getItem("bgmtoggle");
  let savedSfxToggle = "" + localStorage.getItem("sfxtoggle");

  const BGM = new Audio(Theme);
  const HoverSFX = new Audio(Hover);
  const ClickSFX = new Audio(Click);
  const PlaySFX = new Audio(Play);

  const bgmVolumeBar = useRef();
  const bgmVolumeDisplay = useRef();
  const sfxVolumeBar = useRef();
  const sfxVolumeDisplay = useRef();
  const bgmSwitch = useRef();
  const sfxSwitch = useRef();
  const colorPalette1 = useRef();
  const colorPalette2 = useRef();

  const [alert, setAlert] = useState("");
  const [lang, setLang] = useState(
    localStorage.getItem("language") ? localStorage.getItem("language") : "EN"
  );

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
      HoverSFX.volume = savedSfxVolume / 100;
      HoverSFX.pause();
      HoverSFX.currentTime = 0;
      HoverSFX.play();
    }
  };

  const onClick = (e, ref) => {
    if (ref) {
      if (ref === "bgm") {
        localStorage.setItem("bgmtoggle", !bgmSwitch.current.checked);
        savedBgmToggle = "" + !bgmSwitch.current.checked;
        if (!bgmSwitch.current.checked === true) BGM.play();
        else BGM.pause();
      }
      if (ref === "sfx") {
        localStorage.setItem("sfxtoggle", !sfxSwitch.current.checked);
        savedSfxToggle = "" + !sfxSwitch.current.checked;
      }
    }

    if (savedSfxToggle === "true") {
      const text = e.target.text;
      ClickSFX.volume = savedSfxVolume / 100;
      PlaySFX.volume = savedSfxVolume / 100;
      if (text === "Shiritori" || text === "시리토리") {
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

  const resetColor = () => {
    localStorage.removeItem("backgroundcolor1");
    localStorage.removeItem("backgroundcolor2");
    colorPalette1.current.value = "#FEFFDB";
    colorPalette2.current.value = "#FFC60B";
    if (
      alert !== "Changes will apply when refreshing." &&
      "새로고침 후 적용됩니다."
    )
      setAlert(
        lang === "KR"
          ? "새로고침 후 적용됩니다."
          : "Changes will apply when refreshing."
      );
  };

  const changeColor = (e, num) => {
    if (num === 1) localStorage.setItem("backgroundcolor1", e.target.value);
    if (num === 2) localStorage.setItem("backgroundcolor2", e.target.value);
    if (
      alert !== "Changes will apply when refreshing." &&
      "새로고침 후 적용됩니다."
    )
      setAlert(
        lang === "KR"
          ? "새로고침 후 적용됩니다."
          : "Changes will apply when refreshing."
      );
  };

  const changeBgmVolumeStart = () => {
    BGM.volume = bgmVolumeBar.current.value / 100;
    bgmVolumeDisplay.current.innerHTML = bgmVolumeBar.current.value;
  };

  const changeBgmVolumeEnd = () => {
    localStorage.setItem("bgmvolume", bgmVolumeBar.current.value);
  };

  const changeSfxVolumeStart = () => {
    HoverSFX.volume = sfxVolumeBar.current.value / 100;
    ClickSFX.volume = sfxVolumeBar.current.value / 100;
    PlaySFX.volume = sfxVolumeBar.current.value / 100;
    sfxVolumeDisplay.current.innerHTML = sfxVolumeBar.current.value;
  };

  const changeSfxVolumeEnd = () => {
    localStorage.setItem("sfxvolume", sfxVolumeBar.current.value);
  };

  const changeLang = (e) => {
    localStorage.setItem("language", e.target.value);
    setLang(e.target.value);
    if (alert !== "")
      setAlert(
        lang === "KR"
          ? "Changes will apply when refreshing."
          : "새로고침 후 적용됩니다."
      );
  };

  return (
    <>
      <S.Logo onClick={onClick} to="/">
        {lang === "KR" ? "시리토리" : "Shiritori"}
      </S.Logo>
      <S.Wrapper>
        <S.TextWrapper>
          <S.Text>{lang === "KR" ? "음악 볼륨" : "Music Volume"}</S.Text>
          <S.Checkbox
            type="checkbox"
            ref={bgmSwitch}
            id="bgm"
            defaultChecked={JSON.parse(savedBgmToggle)}
          />
          <S.Label
            htmlFor="bgm"
            onMouseEnter={onHover}
            onClick={(e) => onClick(e, "bgm")}
          >
            <S.Button></S.Button>
          </S.Label>
        </S.TextWrapper>
        <S.Range
          type="range"
          min="0"
          max="100"
          ref={bgmVolumeBar}
          onInput={changeBgmVolumeStart}
          onMouseUp={changeBgmVolumeEnd}
          onMouseEnter={onHover}
          onMouseDown={onClick}
          defaultValue={savedBgmVolume}
        />
        <S.Value ref={bgmVolumeDisplay}>{savedBgmVolume}</S.Value>
      </S.Wrapper>

      <S.Wrapper>
        <S.TextWrapper>
          <S.Text>{lang === "KR" ? "효과음 볼륨" : "SFX Volume"}</S.Text>
          <S.Checkbox
            ref={sfxSwitch}
            type="checkbox"
            id="sfx"
            defaultChecked={JSON.parse(savedSfxToggle)}
          />
          <S.Label
            onMouseEnter={onHover}
            onClick={(e) => onClick(e, "sfx")}
            htmlFor="sfx"
          >
            <S.Button></S.Button>
          </S.Label>
        </S.TextWrapper>
        <S.Range
          type="range"
          min="0"
          max="100"
          ref={sfxVolumeBar}
          onInput={changeSfxVolumeStart}
          onMouseUp={changeSfxVolumeEnd}
          onMouseEnter={onHover}
          onMouseDown={onClick}
          defaultValue={savedSfxVolume}
        />
        <S.Value ref={sfxVolumeDisplay}>{savedSfxVolume}</S.Value>
      </S.Wrapper>

      <S.Wrapper>
        <S.TextWrapper>
          <S.Text>{lang === "KR" ? "배경 색깔" : "Background Color"}</S.Text>
        </S.TextWrapper>
        <S.TextWrapper>
          <S.Color
            type="color"
            ref={colorPalette1}
            onMouseEnter={onHover}
            onMouseDown={onClick}
            onChange={(e) => changeColor(e, 1)}
            defaultValue={
              savedBackgroundColor1 ? savedBackgroundColor1 : "#FEFFDB"
            }
          />
          <S.Color
            type="color"
            ref={colorPalette2}
            onMouseEnter={onHover}
            onMouseDown={onClick}
            onChange={(e) => changeColor(e, 2)}
            defaultValue={
              savedBackgroundColor2 ? savedBackgroundColor2 : "#FFC60B"
            }
          />
          <S.Reset
            onMouseEnter={onHover}
            onMouseDown={onClick}
            onClick={resetColor}
          >
            ⟲
          </S.Reset>
        </S.TextWrapper>
        <S.Alert>{alert && alert}</S.Alert>
      </S.Wrapper>

      <S.Wrapper>
        <S.TextWrapper>
          <S.Text>{lang === "KR" ? "언어" : "Language"}</S.Text>
        </S.TextWrapper>
        <S.Lang onChange={changeLang} defaultValue={lang}>
          <option value="EN" defaultValue>
            {lang === "KR" ? "영어" : "English"}
          </option>
          <option value="KR">{lang === "KR" ? "한국어" : "Korean"}</option>
        </S.Lang>
      </S.Wrapper>
    </>
  );
});

export default React.memo(SettingsPage);
