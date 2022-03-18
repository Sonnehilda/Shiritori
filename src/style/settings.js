import styled from "styled-components";
import { Link } from "react-router-dom";

export const Logo = styled(Link)`
  all: unset;

  font-size: calc(8vh);
  font-weight: 300;
  color: #d8c292;

  transition: 0.25s filter;
  cursor: pointer;

  :hover {
    filter: brightness(125%) drop-shadow(0rem 0rem 0.5rem #f2a154);
  }
`;

export const TextWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  input:checked + label span {
    left: 3vh;
  }
  label {
    filter: opacity(75%);
    transition: filter 0.25s;
  }
  label:hover {
    filter: opacity(100%);
  }
`;

export const Text = styled.div`
  margin-bottom: 1.5vh;

  font-size: 2vh;
  font-weight: 100;
  color: #ccc;
`;

export const Label = styled.label`
  position: relative;
  background: #fff;

  margin-bottom: 1vh;
  margin-left: 1vh;

  width: 5vh;
  height: 2vh;

  display: inline-block;

  border-radius: 1.5vh;
  transition: left 0.2s;
  cursor: pointer;
`;

export const Button = styled.span`
  position: absolute;
  top: 0.1vh;
  left: 0.25vh;

  background: #f2a154;

  width: 1.75vh;
  height: 1.75vh;

  display: inline-block;

  border-radius: 50%;
  transition: left 0.2s;
`;

export const Checkbox = styled.input`
  position: absolute;
  /* hidden */
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
`;

export const Wrapper = styled.div`
  position: relative;
  background-color: #333;

  width: 35vh;
  height: 15vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  border-radius: 1.5vh;
  z-index: -1;
`;

export const Value = styled.div`
  margin-top: 1.5vh;

  font-size: 2vh;
  font-weight: 100;
  color: #ccc;
`;

export const Range = styled.input`
  all: unset;

  background: #d8c292;

  width: 25vh;
  height: 1.5vh;

  border-radius: 1.5vh;

  filter: opacity(75%);
  transition: filter 0.25s;

  :hover {
    filter: opacity(100%);
  }

  ::-webkit-slider-thumb {
    appearance: none;
    background: #f2a154;

    width: 3vh;
    height: 3vh;

    border-radius: 50%;
    cursor: pointer;
  }

  ::-moz-range-thumb {
    background: #f2a154;

    width: 3vh;
    height: 3vh;

    border-radius: 50%;
    cursor: pointer;
  }
`;

export const Color = styled.input`
  margin: 0;
  padding: 0;
  margin-right: 1vw;
  padding-left: 1vh;
  padding-right: 1vh;

  background: #ccc;
  border: none;

  width: 7.5vh;
  height: 3vh;

  border-radius: 1.5vh;
  filter: opacity(75%);
  cursor: pointer;
  transition: filter 0.25s;

  :hover {
    filter: opacity(100%);
  }
`;

export const Reset = styled.button`
  margin: 0;
  padding: 0;

  all: unset;

  background: #ccc;

  width: 7.5vh;
  height: 3vh;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 2vh;

  border-radius: 1.5vh;
  filter: opacity(75%);
  cursor: pointer;
  transition: filter 0.25s;

  :hover {
    filter: opacity(100%);
  }
`;

export const Alert = styled.div`
  margin-top: 1.5vh;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 2vh;
  font-weight: 100;
  color: #ccc;
`;

export const Lang = styled.select`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  padding-left: 1vh;

  background-image: url("https://d29fhpw069ctt2.cloudfront.net/icon/image/39091/preview.png");
  background-color: transparent;
  background-repeat: no-repeat;
  background-position: 21.5vh 0.7vh;
  background-size: 2vh 2vh;

  width: 25vh;
  height: 4vh;

  font-size: 1.5vh;
  font-weight: 100;
  color: #fff;

  border: 0.25vh solid #ccc;
  border-radius: 1.5vh;
  filter: opacity(75%);

  option {
    color: #000;
  }
  ::-ms-expand {
    display: none;
  }
`;
