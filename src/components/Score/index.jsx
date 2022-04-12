import * as S from "./styles";
import { useSelector } from "react-redux";

function Score({ scoreGiven, sgVisible }) {
  const lang = localStorage.getItem("language")
    ? localStorage.getItem("language")
    : "EN";

  const scoreCount = useSelector((state) => state.score);

  return (
    <>
      <S.Score>
        {lang === "KR" ? "점수 : " : "Score : "}
        {scoreCount}
      </S.Score>
      {scoreCount && (
        <S.ScoreGiven
          scoreGiven={scoreGiven}
          sgVisible={sgVisible}
        >{`+ ${scoreGiven}`}</S.ScoreGiven>
      )}
    </>
  );
}

export default Score;
