import React from "react";
import cx from "classnames";
import { css } from "@emotion/css";
import { ThemeContext } from "../../contexts/ThemeContext";
import Tabs from "./tabs";
import Header from "./header";



export default function Home() {
  const [theme] = React.useContext(ThemeContext);

  return (
    <div className={cx(css`
      color: ${theme.color.white};
      display: flex;
      align-items: center;
      flex-direction: column;
    `)}>
      <Header />
      <Tabs />
    </div>
  );
}
