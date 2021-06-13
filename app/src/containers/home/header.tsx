import React from "react";
import cx from "classnames";
import { css } from "@emotion/css";
import background from "../../images/other/background.svg";
import { ThemeContext } from "../../contexts/ThemeContext";
import Button from "../../components/button";
import Text from "../../components/text";
import { SIZE } from "../../components/text";
import Icon from "../../components/icon";
import { HashLink } from 'react-router-hash-link';

import twitterIcon from "../../images/icons/twitter.svg";
import githubIcon from "../../images/icons/github.svg";



export default function MyHeader() {
  const [theme] = React.useContext(ThemeContext);



  return (

    <div
      className={cx(css`
        -webkit-background-size: cover;
        -moz-background-size: cover;
        -o-background-size: cover;
        background-size: cover;
        background-image: url(${background});
        width: 100%;
        min-height: 80vh;
        display: flex;
        align-items: center;
        justify-content: center;
      `)}
    >
      <div
        className={cx(css`
            background-size: 100% 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            color: ${theme.color.white};
            padding: ${theme.spacing.large}px;
          `)}
      >
        <Text
          weight={600}
          size={"header"}
          style={cx(css`
              font-weight: 600;
              font-size: 96px;
              line-height: 106px;
              letter-spacing: 0.04em;
              color: ${theme.color.white};
              margin: 100px 0;
            `)}
        >
          Take full control of your Art
          </Text>

        <HashLink
          to={"/#create"}
          smooth
          className={cx(css`margin-right:${theme.spacing.large}px; cursor: pointer;text-decoration: none;`)}>
          <Button onClick={async () => { }}>
            <Text weight={"500"} size={"title"}>
              Create Your Secret NFTs
          </Text>
          </Button>
        </HashLink>


        <div
          className={cx(css`
              display: flex;
              flex-direction: column;
            `)}
        >
          <Text
            size={"title"}
            style={cx(
              css`
                  margin-top: 100px;
                `
            )}
          >
            Goes Live Early August
            </Text>
          <div
            className={cx(css`
                display: flex;
                margin-top: 20px;
                justify-content: center;
                & > * {
                  margin: 0 10px;
                }
              `)}
          >
            <Icon
              color={theme.color.orange}
              icon={twitterIcon}
              href="https://github.com/chainofsecrets"
              blank
            />
            <Icon
              color={theme.color.orange}
              icon={githubIcon}
              href="https://github.com/chainofsecrets"
              blank
            />
          </div>
        </div>
      </div>
    </div>
  );
}
