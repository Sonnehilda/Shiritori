import styled, { keyframes } from "styled-components";

export const Wrapper = styled.div`
  background-color: #666;

  margin: 0 auto;
  margin-top: 5vh;

  width: 75vh;
  height: 90vh;

  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;

  text-align: center;

  border-radius: 1.5vh;

  filter: opacity(75%);
`;

export const Char = styled.div`
  font-size: 2.5vh;
  font-weight: 100;
  color: #ff0;
`;

export const Word = styled.div`
  font-size: ${(props) =>
    props.status === "wrong"
      ? "2rem"
      : (props) => (props.status === "correct" ? "2rem" : "1.5rem")};
  font-weight: 100;
  color: ${(props) =>
    props.status === "wrong"
      ? "red"
      : (props) => (props.status === "correct" ? "#FFF" : "#AAA")};
`;

export const Meaning = styled.div`
  width: 40vh;

  font-size: 2vh;
  font-weight: 100;
  color: #ff0;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const Input = styled.input`
  all: unset;
  width: 15rem;
  height: 1.5rem;
  border-bottom: 0.1rem solid #fff;
  color: #fff;
  font-size: 1rem;
`;

export const TimerBar = styled.div`
  width: 15rem;
  height: 1rem;
  display: inline-flex;
  justify-content: center;
`;

export const TimerBarEmpty = styled.div`
  z-index: 0;
  position: absolute;
  width: 15rem;
  height: 1rem;
  background-color: #acacac;
`;

export const TimerBarFull = styled.div`
  z-index: 1;
  position: absolute;
  width: ${(props) => `${props.time / 6.666}rem`};
  height: 1rem;
  background-color: rgb(255, ${(props) => props.time * 2.55}, 0);
`;

export const TimerDisplay = styled.div`
  font-size: 1rem;
  font-weight: 100;
  color: #ccc;
`;

export const Score = styled.div`
  font-size: 1.5rem;
  color: #fff;
`;

const fadeOut = keyframes`
0% {
  opacity: 1;
  bottom: 0rem;
}
100% {
  opacity: 0;
  bottom: 2.85rem;
}
`;

export const ScoreGiven = styled.div`
  position: relative;
  font-size: ${(props) => (props.scoreGiven >= 80 ? "1.5rem" : "1rem")};
  color: ${(props) => (props.scoreGiven >= 80 ? "#f00" : "#ccc")};

  opacity: ${(props) => (props.sgVisible ? 1 : 0)};

  animation: ${(props) => (props.sgVisible ? "" : fadeOut)} 0.5s ease-in-out;
`;
