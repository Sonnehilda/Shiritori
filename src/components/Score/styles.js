import styled, { keyframes } from "styled-components";

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
