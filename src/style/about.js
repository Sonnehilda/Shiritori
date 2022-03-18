import styled from "styled-components";
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

export const PhraseWrapper = styled.div`
  position: relative;
  background-color: #333;

  padding-top: 2vh;
  padding-bottom: 2vh;

  width: 40vh;

  border-radius: 1.5vh;
  z-index: -1;

  div {
    height: 1vh;
  }
`;

export const Phrase = styled.p`
  font-size: 2vh;
  font-weight: 100;
  color: #ccc;

  z-index: 0;

  span {
    color: #ffa;
  }
`;

export const Desc = styled.p`
  font-size: 1.5vh;
  font-weight: 100;
  color: #aaa;

  z-index: 0;
`;

export const Copyable = styled.p`
  position: relative;
  left: 50%;
  transform: translateX(-50%);

  width: max-content;

  font-size: 2vh;
  font-weight: 100;
  color: #ccc;

  border-bottom: 0.25vh solid transparent;
  animation: flash 3s ease-in-out infinite;
  cursor: pointer;
  z-index: 0;
  filter: brightness(125%) drop-shadow(0 0 0 #f2a154);
  transition: 0.25s filter, 0.25s border-bottom;

  :hover {
    filter: brightness(150%) drop-shadow(0 0 0.5vh #fff);
    text-decoration: none;
    animation: none;
    border-bottom: 0.25vh solid #ffa;
    ::after {
      position: absolute;
      background-color: #000;

      margin-top: 1vh;

      width: 100%;
      height: 2.5vh;

      display: flex;
      justify-content: center;
      align-items: center;

      font-size: 1vh;
      font-weight: 100;
      color: #aaa;

      filter: brightness(100%) drop-shadow(0 0 0 #f2a154);
      text-decoration: none;
      animation: none;
      z-index: 1;
      content: "${(props) => props.alert}";
    }
  }

  @keyframes flash {
    0% {
      filter: brightness(125%) drop-shadow(0 0 0 #f2a154);
    }
    50% {
      filter: brightness(125%) drop-shadow(0 0 0.5vh #f2a154);
    }
    100% {
      filter: brightness(125%) drop-shadow(0 0 0 #f2a154);
    }
  }
`;
