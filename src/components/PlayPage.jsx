import React, { useState, useRef, useEffect, useReducer } from "react";
import axios from "axios";
import * as S from "../style/play";
import Correct from "../sfx/correct.mp3";
import Wrong from "../sfx/wrong.mp3";
import Boom from "../sfx/boom.mp3";
import GameOver from "../sfx/over.mp3";
import Music from "../bgm/Game.mp3";

const PlayPage = React.memo(function PlayPage() {
  const CorrectSFX = new Audio(Correct);
  const WrongSFX = new Audio(Wrong);
  const BoomSFX = new Audio(Boom);
  const GameOverSFX = new Audio(GameOver);
  const BGM = new Audio(Music);

  let currentTime = 0;
  const nameInput = useRef();

  const [char, setChar] = useState("");
  const [word, setWord] = useState("");
  const [meanings, setMeanings] = useState("");
  const [status, setStatus] = useState("");
  const [scoreGiven, setScoreGiven] = useState(0);
  const [score, setScore] = useState(0);
  const [sgDelay, setSgDelay] = useState(1000);
  const [sgVisible, setSgVisible] = useState(false);
  const [disabled, setDisabled] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [usedWord, setUsedWord] = useState(new Set());

  const [time, dispatch] = useReducer((state = 200, action) => {
    if (action.type === "tick")
      if (word)
        if (state > 0) return state - 1;
        else {
          GameOverSFX.play();
          alert(`Game Over! : Your score was ${score}.`);
          setChar("");
          setWord("");
          setMeanings("");
          setStatus("");
          setScoreGiven(0);
          setSgVisible(false);
          setScore(0);
          setDisabled(false);
          usedWord.clear();
          return (state = 200);
        }
    if (action.type === "score")
      if (parseInt(state) + parseInt([action.len]) > 200) return (state = 200);
      else return parseInt(state) + parseInt([action.len]);
    return state;
  });

  useEffect(() => {
    const Timer = setInterval(() => {
      dispatch({ type: "tick" });
    }, 500);
    return () => {
      clearInterval(Timer);
    };
  }, []);

  useEffect(() => {
    CorrectSFX.volume = 0.25;
    WrongSFX.volume = 0.25;
    BoomSFX.volume = 0.25;
    GameOverSFX.volume = 0.25;
    BGM.volume = 0.75;

    playGame();
    window.addEventListener("focus", playGame);
    window.addEventListener("blur", pauseGame);
    return () => {
      window.removeEventListener("focus", playGame);
      window.removeEventListener("blur", pauseGame);
      pauseGame();
      setUsedWord(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const playGame = () => {
    BGM.loop = true;
    BGM.currentTime = currentTime;
    BGM.play();
    nameInput.current.focus();
  };

  const pauseGame = () => {
    BGM.pause();
    currentTime = BGM.currentTime;
  };

  const errorMessage = (msg) => {
    WrongSFX.play();
    setMeanings(msg);
    setStatus("wrong");
    resetInput();
  };

  const resetInput = () => {
    nameInput.current.value = "";
    nameInput.current.focus();
  };

  const onSubmit = async (e) => {
    if (e.key === "Enter") {
      const input = nameInput.current.value.toLowerCase();
      const form = `${input[0].toUpperCase()}${input.substring(1)}`;

      if (usedWord.size > 0 && usedWord.has(form)) {
        errorMessage("You've already used that word!");
        return;
      }
      if (form.length < 2) {
        errorMessage("Word is too short!");
        return;
      }
      if (char && form[0].toLowerCase() !== char) {
        errorMessage(`Word must start with '${char}'!`);
        return;
      }

      setDisabled(true);
      axios
        .get(`https://api.dictionaryapi.dev/api/v2/entries/en/${form}`)
        .then((res) => {
          usedWord.add(form);
          if (form.length < 10) CorrectSFX.play();
          else BoomSFX.play();

          setWord(() => form);
          setChar(() => form.charAt(form.length - 1));
          setMeanings(res.data[0].meanings[0].definitions[0].definition);
          setStatus("correct");

          const len = Math.round(input.length / 1.25);
          dispatch({ type: "score", len });
          setScore(() => score + len * 10);
          setScoreGiven(() => len * 10);
          setSgVisible(() => true);
          setSgDelay(() => 1000);
        })
        .catch(() => {
          setDisabled(false);
          errorMessage("That word doesn't exist.");
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
    <S.Wrapper>
      {word && (
        <S.Char>{char ? `Word That's Start With : ${char}` : ""}</S.Char>
      )}
      <S.Word status={status}>{word ? word : "Type Any Word!"}</S.Word>
      <S.Meaning>{meanings}</S.Meaning>
      <S.Input
        ref={nameInput}
        onKeyDown={onSubmit}
        disabled={disabled}
        onCopy={preventCopyPaste}
        onPaste={preventCopyPaste}
      ></S.Input>
      {word && (
        <>
          <S.TimerBar>
            <S.TimerBarEmpty />
            <S.TimerBarFull time={time / 2} />
          </S.TimerBar>
          <S.TimerDisplay>{Math.round(time / 2)}</S.TimerDisplay>
          <S.Score>Score : {score}</S.Score>
          {score && (
            <S.ScoreGiven
              scoreGiven={scoreGiven}
              sgVisible={sgVisible}
            >{`+ ${scoreGiven}`}</S.ScoreGiven>
          )}
        </>
      )}
    </S.Wrapper>
  );
});

export default React.memo(PlayPage);
