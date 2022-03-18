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

export const Button = styled(Link)`
  all: unset;
  background-color: #d8c292;

  width: 25vh;
  height: 6vh;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 2.25vh;
  font-weight: 100;
  color: #000;

  border-radius: 1.5vh;

  transition: 0.25s filter;
  cursor: pointer;

  :hover {
    filter: brightness(125%) drop-shadow(0rem 0rem 0.25rem #f2a154);
  }
`;
