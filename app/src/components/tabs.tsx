import React, { ReactNode } from "react"; // we need this to make JSX compile
import cx from "classnames";
import { css } from "@emotion/css";
import Text, { SIZE } from "./text";
import { ThemeContext } from "../contexts/ThemeContext";

interface TAB {
  name: string;
  children: ReactNode;
}

type Props = { tabs: TAB[]; selectedIndex: Number; onChange: Function };

export default function Tabs({ tabs, selectedIndex, onChange }: Props) {
  const [theme] = React.useContext(ThemeContext);

  return (
    <div
      className={cx(css`
        display: flex;
        flex-direction: column;
        width: 100%;
      `)}
    >
      <div
        className={cx(
          css`
            display: flex;
            margin-bottom: ${theme.spacing.large}px;
            justify-content: space-between;
          `
        )}
      >
        {tabs.map((tab, index) => (
          <div
            onClick={() => onChange(index)}
            className={cx(css`
              display: flex;
              flex-direction: column;
              cursor: pointer;

              & > span {
                transition: width 0.4s;
                width: ${index === selectedIndex ? "70%" : "0px"};
              }

              &:hover {
                span {
                  width: 70%;
                }
              }
            `)}
          >
            <Text
              size={SIZE.title}
              color={
                index === selectedIndex ? theme.color.black : theme.color.grey
              }
            >
              {tab.name}
            </Text>
            <span
              className={cx(css`
                height: 3px;
                width: 70%;
                margin-top: ${theme.spacing.small}px;
                background: linear-gradient(
                  to right,
                  ${theme.color.orange},
                  ${theme.color.pink}
                );
              `)}
            ></span>
          </div>
        ))}
      </div>
      {tabs[Number(selectedIndex)].children}
    </div>
  );
}
