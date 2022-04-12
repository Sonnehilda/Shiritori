import styled from "styled-components";

export const Wrapper = styled.div`
  background-color: #666;

  margin: 0 auto;
  margin-top: 3.5vh;

  width: 75vh;
  height: 88vh;

  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;

  text-align: center;

  border-radius: 1.5vh;

  filter: opacity(75%);

  @media only screen and (max-width: 600px) {
    width: 90vw;
  }
`;
