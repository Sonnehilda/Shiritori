import React from "react";
import * as S from "./styles";

const Wrapper = React.memo(function Wrapper({ children }) {
  return <S.Wrapper>{children}</S.Wrapper>;
});

export default React.memo(Wrapper);
