import styled from "styled-components";

export const Wrapper = styled.div`
  position: absolute;
  background: #000;

  width: 90%;
  height: 40vh;

  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;

  border-radius: 1.5vh;
  z-index: 1;

  filter: opacity(90%);
`;

export const Close = styled.div`
  position: absolute;
  top: 0;
  right: 2vh;

  font-size: 5vh;
  font-weight: 100;
  color: #ccc;

  cursor: pointer;
  :hover {
    color: #fff;
  }
`;

export const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const MainTitle = styled.div`
  font-size: 4vh;
  font-weight: 100;
  color: #fff;
`;

export const SubTitle = styled.div`
  font-size: 2.5vh;
  font-weight: 100;
  color: #ccc;
`;

export const Score = styled.div`
  font-size: 8vh;
  font-weight: 300;
  color: #fff;
`;
