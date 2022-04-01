import React, { useState, useRef, useEffect } from "react";
import * as S from "../../style/play";
import { useDispatch } from "react-redux";
import axios from "axios";

import Timer from "../Timer";
import Score from "../Score";
import { addTime } from "../../redux/timer/actions";
import { addScore, setScore } from "../../redux/score/actions";

import Game from "../../bgm/game.mp3";
import Play from "../../sfx/play.mp3";
import Correct from "../../sfx/correct.mp3";
import Wrong from "../../sfx/wrong.mp3";
import Boom from "../../sfx/boom.mp3";
import GameOver from "../../sfx/over.mp3";
import OverModal from "../OverModal";

const PlayPage = React.memo(function PlayPage() {
  const lang = localStorage.getItem("language")
    ? localStorage.getItem("language")
    : "EN";

  const BGM = new Audio(Game);
  const PlaySFX = new Audio(Play);
  const CorrectSFX = new Audio(Correct);
  const WrongSFX = new Audio(Wrong);
  const BoomSFX = new Audio(Boom);
  const GameOverSFX = new Audio(GameOver);

  const savedBgmVolume = localStorage.getItem("bgmvolume")
    ? localStorage.getItem("bgmvolume")
    : 75;
  const savedSfxVolume = localStorage.getItem("sfxvolume")
    ? localStorage.getItem("sfxvolume")
    : 75;
  const savedBgmToggle = "" + localStorage.getItem("bgmtoggle");
  const savedSfxToggle = "" + localStorage.getItem("sfxtoggle");

  const nameInput = useRef();
  const dispatch = useDispatch();
  const [char, setChar] = useState("");
  const [word, setWord] = useState("");
  const [meanings, setMeanings] = useState("");
  const [status, setStatus] = useState("");
  const [scoreGiven, setScoreGiven] = useState(0);
  const [sgDelay, setSgDelay] = useState(1000);
  const [sgVisible, setSgVisible] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [overVisible, setOverVisible] = useState(false);
  const [usedWord, setUsedWord] = useState(new Set());

  useEffect(() => {
    BGM.loop = true;
    BGM.volume = savedBgmVolume / 100;

    onFocus();
    if (savedBgmToggle === "true") BGM.play();
    window.addEventListener("focus", onFocus);
    window.addEventListener("blur", onBlur);
    window.addEventListener("mousemove", onFirstJoin);
    window.addEventListener("keydown", onEsc);
    return () => {
      onBlur();
      BGM.pause();
      window.removeEventListener("keydown", onEsc);
      window.removeEventListener("focus", onFocus);
      window.removeEventListener("blur", onBlur);
      window.removeEventListener("mousemove", onFirstJoin);

      usedWord.clear();
      delete [usedWord, setUsedWord];
      setUsedWord(undefined);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onEsc = (e) => {
    if (e.key === "Escape") {
      setOverVisible(false);
    }
  };

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

  const onClick = (e) => {
    if (savedSfxToggle === "true") {
      const text = e.target.text;
      if (text === "Shiritori" || text === "시리토리") {
        PlaySFX.pause();
        PlaySFX.volume = savedSfxVolume / 100;
        PlaySFX.currentTime = 0;
        PlaySFX.play();
      }
    }
  };

  const resetInput = () => {
    nameInput.current.value = "";
    nameInput.current.focus();
  };

  const resetData = () => {
    if (savedSfxToggle === "true") {
      GameOverSFX.pause();
      GameOverSFX.volume = savedSfxVolume / 100;
      GameOverSFX.currentTime = 0;
      GameOverSFX.play();
    }

    nameInput.current.value = "";
    nameInput.current.blur();
    setWord("");
    setMeanings("");
    setStatus("");
    setDisabled(false);
    setOverVisible(true);
    if (usedWord.length > 0) usedWord.clear();
    setTimeout(() => {
      dispatch(setScore(0));
    });
  };

  const errorMessage = (msg) => {
    if (savedSfxToggle === "true") {
      WrongSFX.pause();
      WrongSFX.volume = savedSfxVolume / 100;
      WrongSFX.currentTime = 0;
      WrongSFX.play();
    }

    setMeanings(msg);
    setStatus("wrong");
    resetInput();
  };

  const onSubmit = async (e) => {
    if (e.key === "Enter") {
      if (overVisible) setOverVisible(false);

      //if (lang == "EN") {
      const input = nameInput.current.value.toLowerCase();
      const form = `${input[0].toUpperCase()}${input.substring(1)}`;
      //} else if (lang == "KR") form = nameInput.current.value;

      if (usedWord.length > 0 && usedWord.has(form)) {
        errorMessage(
          lang === "KR"
            ? "이미 해당 단어를 사용하였습니다!"
            : "You've already used that word!"
        );
        return;
      }
      if (form.length < 2) {
        errorMessage(
          lang === "KR" ? "단어가 너무 짧습니다!" : "Word is too short!"
        );
        return;
      }
      if ((word !== "" || word) && form[0].toLowerCase() !== char) {
        errorMessage(
          lang === "KR"
            ? `'${char}' 로 시작하는 단어가 아닙니다!`
            : `Word must start with '${char}'!`
        );
        return;
      }

      setDisabled(true);
      axios
        .get(
          //lang === "EN" ?
          `https://api.dictionaryapi.dev/api/v2/entries/en/${form}`
          // : `https://api.dictionaryapi.dev/api/v2/entries/en/${form}` //`https://glosbe.com/gapi/translate?from=kor&dest=eng&format=json&pretty=true&phrase=${form}`
        )
        .then((res) => {
          setWord(() => form);
          setChar(() => form.charAt(form.length - 1));
          setMeanings(
            //lang === "EN" ?
            res.data[0].meanings[0].definitions[0].definition
            //: res.data[0].meanings[0].definitions[0].definition
          );
          setStatus("correct");
          usedWord.add(form);

          const len = Math.round(form.length / 1.25);

          if (savedSfxToggle === "true")
            if (len >= 80) {
              BoomSFX.pause();
              BoomSFX.volume = savedSfxVolume / 100;
              BoomSFX.currentTime = 0;
              BoomSFX.play();
            } else {
              CorrectSFX.pause();
              CorrectSFX.volume = savedSfxVolume / 100;
              CorrectSFX.currentTime = 0;
              CorrectSFX.play();
            }

          dispatch(addTime(len));
          dispatch(addScore(len * 10));
          setScoreGiven(() => len * 10);
          setSgVisible(() => true);
          setSgDelay(() => 1000);
        })
        .catch(() => {
          setDisabled(false);
          errorMessage(
            lang === "KR"
              ? "That word doesn't exist."
              : "해당 단어는 존재하지 않습니다."
          );
          return;
        })
        .then(() => {
          setDisabled(false);
          resetInput();

          setTimeout(() => {
            setSgVisible(() => false);
          }, sgDelay);
        });
    }
  };

  const preventCopyPaste = (e) => {
    e.preventDefault();
  };

  return (
    <>
      {overVisible && <OverModal setOverVisible={setOverVisible} />}
      <S.Logo onClick={onClick} to="/">
        {lang === "KR" ? "시리토리" : "Shiritori"}
      </S.Logo>
      {word && (
        <S.Char>
          {lang === "KR"
            ? `${char} 로 시작하는 단어를 입력하세요!`
            : `Word That's Start With : ${char}`}
        </S.Char>
      )}
      <S.Word status={status}>
        {word
          ? word
          : lang === "KR"
          ? "아무 단어를 입력해보세요!"
          : "Type Any Word!"}
      </S.Word>
      <S.Meaning>{meanings}</S.Meaning>
      <S.Input
        ref={nameInput}
        disabled={disabled}
        onKeyDown={onSubmit}
        onCopy={preventCopyPaste}
        onPaste={preventCopyPaste}
      ></S.Input>
      {word && (
        <>
          <Timer resetData={resetData} />
          <Score scoreGiven={scoreGiven} sgVisible={sgVisible} />
        </>
      )}
    </>
  );
});

export default React.memo(PlayPage);
