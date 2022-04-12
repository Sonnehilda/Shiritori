import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";

export const Logo = styled(Link)`
  all: unset;

  font-size: 8vh;
  font-weight: 300;
  color: #d8c292;

  transition: 0.25s filter;
  cursor: pointer;

  :hover {
    filter: brightness(125%) drop-shadow(0rem 0rem 0.5rem #f2a154);
  }
`;

export const Char = styled.div`
  font-size: 2.5vh;
  font-weight: 100;
  color: #ccc;
`;

export const Word = styled.div`
  font-size: ${(props) =>
    props.status === "wrong"
      ? "4vh"
      : (props) => (props.status === "correct" ? "4vh" : "3vh")};
  font-weight: 100;
  color: ${(props) =>
    props.status === "wrong"
      ? "red"
      : (props) => (props.status === "correct" ? "#FFF" : "#CCC")};

  filter: opacity(125%) brightness(125%) drop-shadow(0rem 0rem 0.5rem #f2a154) !important;
`;

export const Meaning = styled.div`
  width: 40vh;

  font-size: 2vh;
  font-weight: 100;
  color: #ccc;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const Input = styled.input`
  all: unset;

  width: 27.5vh;
  height: 3vh;

  font-size: 2vh;
  font-weight: 100;
  color: #fff;

  border-bottom: 0.2vh solid #fff;
`;

export const TimerBar = styled.div`
  width: 27.5vh;
  height: 1rem;

  display: inline-flex;
  justify-content: center;
`;

export const TimerBarEmpty = styled.div`
  position: absolute;
  background-color: #acacac;

  width: 27.5vh;
  height: 1.5vh;

  z-index: 0;
`;

export const TimerBarFull = styled.div`
  z-index: 1;
  position: absolute;
  width: ${(props) => `${props.time / 3.637}vh`};
  height: 1.5vh;
  background-color: rgb(255, ${(props) => props.time * 2.55}, 0);
`;

export const TimerDisplay = styled.div`
  font-size: 2vh;
  font-weight: 100;
  color: #ccc;
`;

export const Score = styled.div`
  font-size: 3vh;
  font-weight: 100;
  color: #fff;
`;

const fadeOut = keyframes`
0% {
  opacity: 1;
}
100% {
  bottom: 8.6vh;
  opacity: 0;
}
`;

export const ScoreGiven = styled.div`
  position: relative;
  bottom: 0vh;

  font-size: ${(props) => (props.scoreGiven >= 80 ? "3vh" : "2vh")};
  font-weight: 100;
  color: ${(props) => (props.scoreGiven >= 80 ? "#f00" : "#ccc")};

  opacity: ${(props) => (props.sgVisible ? 1 : 0)};

  animation: ${(props) => (props.sgVisible ? "" : fadeOut)} 0.5s ease-in-out;
`;
