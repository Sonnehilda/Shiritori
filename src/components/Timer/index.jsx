import { useEffect } from "react";
import * as S from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { tickTimeType } from "../../redux/timer/types";

function Timer({ resetData }) {
  const timerCount = useSelector((state) => state.timer);
  const dispatch = useDispatch();

  useEffect(() => {
    const Timer = setInterval(() => {
      dispatch({
        type: tickTimeType,
        resetData: resetData,
      });
    }, 500);
    return () => {
      clearInterval(Timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <S.TimerBar>
        <S.TimerBarEmpty />
        <S.TimerBarFull time={timerCount / 2} />
      </S.TimerBar>
      <S.TimerDisplay>{Math.round(timerCount / 2)}</S.TimerDisplay>
    </>
  );
}

export default Timer;
