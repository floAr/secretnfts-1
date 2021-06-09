import { css } from '@emotion/css'
import cx from 'classnames'
import React from 'react'
import { Link } from 'react-router-dom'

import { ThemeContext } from '../contexts/ThemeContext'
import githubIcon from '../images/icons/github.svg'
import twitterIcon from '../images/icons/twitter.svg'
import Icon from './icon'
import Logo from './logo'
import Text from './text'
import { SIZE } from './text'

export default function Footer() {
  const [theme] = React.useContext(ThemeContext)

  return (
    <div
      className={cx(css`
        display: flex;
        justify-content: center;
        padding: 100px;
        background-color: ${theme.color.purpledark};
      `)}
    >
      <div
        className={cx(css`
          display: flex;
          flex-direction: row;
          width: 100%;
          justify-content: space-between;
          @media only screen and (max-width: 750px) {
            flex-direction: column;
            align-items: center;
            text-align: center;
          }
        `)}
      >
        <div
          className={cx(
            css`
              display: flex;
              flex-direction: column;
            `
          )}
        >
          <Link
            to="/"
            className={cx(
              css`
                align-items: center;
                display: flex;
                text-decoration: none;
                color: inherit;
              `
            )}
          >
            <Logo white width={60} />
            <Text
              style={cx(
                css`
                  margin-left: 15px;
                `
              )}
              size={SIZE.section}
            >
              Secret NFTs
            </Text>
          </Link>
          <Text
            style={cx(
              css`
                margin-top: 20px;
              `
            )}
            size={SIZE.normal}
          >
            The most secured decentralised NFT in cryptospace.
          </Text>
          <Text
            style={cx(
              css`
                margin-top: 20px;
              `
            )}
            size={SIZE.note}
          >
            © 2021 Secret NFTs
          </Text>
          <div
            className={cx(
              css`
                display: flex;
                margin-top: 20px;
                & > * {
                  margin-right: 10px;
                }
              `
            )}
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
        <div
          className={cx(css`
            display: flex;
            flex-direction: column;
            font-size: 18px;
            justify-content: center;
            @media only screen and (max-width: 750px) {
              margin-top: 30px;
              font-size: 13px;
            }
          `)}
        >
          <div
            className={cx(
              css`
                display: flex;
                flex-direction: row;
                font-weight: 600px;
                align-items: center;
              `
            )}
          ></div>
        </div>
      </div>
    </div>
  )
}
