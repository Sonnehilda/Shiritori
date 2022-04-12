import React from "react";
import * as S from "./styles";

const Footer = React.memo(function Footer() {
  return (
    <S.PreFooter>
      <S.Footer>
        <S.Copyright>ⓒ 2022 __Rals All rights reserved.</S.Copyright>
      </S.Footer>
    </S.PreFooter>
  );
});

export default React.memo(Footer);
