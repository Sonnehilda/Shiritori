import styled from "styled-components";

export const PreFooter = styled.footer`
  position: relative;
  margin-top: 3.5vh;

  width: 100%;
  height: 5vh;

  display: flex;
  align-items: center;
  justify-content: center;

  color: #fff;

  background-color: #666;
  filter: opacity(75%);

  z-index: 1;
`;

export const Footer = styled.footer`
  margin: 0 auto;

  width: 65vh;
  height: 5vh;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;

  color: #fff;

  > div {
    margin-left: 1rem;
    margin-right: 1rem;
  }
`;

export const Copyright = styled.div`
  font-size: 2vh;
  font-weight: 100;
  color: #d8c292;
`;
