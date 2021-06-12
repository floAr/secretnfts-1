import { css } from '@emotion/css'
import cx from 'classnames'
import { FC, memo, useContext, useMemo } from 'react'
import { Link } from 'react-router-dom'

import { LanguageContext } from '../contexts/LanguageContext'
import { Theme, ThemeContext } from '../contexts/ThemeContext'
import { dictionary } from '../dictionary'
import discordIcon from '../images/icons/discord_black.svg'
import githubIcon from '../images/icons/github_black.svg'
import telegramIcon from '../images/icons/telegram_plane.svg'
import twitterIcon from '../images/icons/twitter_black.svg'
import Icon from './icon'
import Logo from './logo'
import Text from './text'
import { SIZE } from './text'

interface Tab {
  type: string
  label: string
  route: string
}

type MenuProps = {
  title: string
  tabs: Tab[]
  theme: Theme
}

const Menu: FC<MenuProps> = ({ title, tabs, theme }) => (
  <div
    className={cx(css`
      display: flex;
      flex: 1;
      flex-direction: column;

      @media only screen and (max-width: ${theme.breakpoint.tablet}px) {
        align-items: center;
      }
    `)}
  >
    <Text
      size={SIZE.title}
      weight={400}
      style={css`
        margin-bottom: 24px;
      `}
    >
      {title}
    </Text>
    <div
      className={cx(css`
        display: flex;
        flex-direction: column;
        row-gap: ${theme.spacing.xsmall}px;

        @media only screen and (max-width: ${theme.breakpoint.tablet}px) {
          align-items: center;
        }
      `)}
    >
      {tabs.map(({ label }) => (
        <Text
          size={SIZE.label}
          weight={400}
          key={label}
          style={css`
            padding: ${theme.spacing.xxsmall}px 0;
            cursor: pointer;
          `}
        >
          {label}
        </Text>
      ))}
    </div>
  </div>
)

const Footer = () => {
  const [theme] = useContext(ThemeContext)
  const [language] = useContext(LanguageContext)

  const MENU = useMemo(
    () => [
      {
        title: dictionary.FOOTER_MENU_ONE_TITLE[language],
        tabs: [
          {
            type: '',
            label: dictionary.FOOTER_MENU_ONE_TAB_ONE[language],
            route: '',
          },
          {
            type: '',
            label: dictionary.FOOTER_MENU_ONE_TAB_TWO[language],
            route: '',
          },
          {
            type: '',
            label: dictionary.FOOTER_MENU_ONE_TAB_THREE[language],
            route: '',
          },
        ],
      },
      {
        title: dictionary.FOOTER_MENU_TWO_TITLE[language],
        tabs: [
          {
            type: '',
            label: dictionary.FOOTER_MENU_TWO_TAB_ONE[language],
            route: '',
          },
          {
            type: '',
            label: dictionary.FOOTER_MENU_TWO_TAB_TWO[language],
            route: '',
          },
        ],
      },
    ],
    [language]
  )

  return (
    <div
      className={cx(css`
        padding: 100px 0;
        background-color: ${theme.color.purpledark};
      `)}
    >
      <div
        className={cx(css`
          margin: 0 auto;
          max-width: 1200px;
          width: 90%;
        `)}
      >
        <div
          className={cx(css`
            display: flex;
            justify-content: center;
            margin: 0 auto;
            width: 100%;

            @media only screen and (max-width: ${theme.breakpoint.tablet}px) {
              align-items: center;
              flex-direction: column-reverse;
              row-gap: ${theme.spacing.xxlarge}px;
            }
          `)}
        >
          <div
            className={cx(
              css`
                display: flex;
                flex: 1;
                flex-direction: column;

                @media only screen and (max-width: ${theme.breakpoint
                    .tablet}px) {
                  align-items: center;
                }
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
              color={theme.color.offwhite}
              weight={400}
              style={cx(
                css`
                  margin-top: 20px;
                  @media only screen and (max-width: ${theme.breakpoint
                      .tablet}px) {
                    text-align: center;
                  }
                `
              )}
              size={SIZE.normal}
            >
              {dictionary.FOOTER_TAGLINE[language]}
            </Text>
            <Text
              color={theme.color.offwhite}
              weight={400}
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
                bg={theme.color.white}
                color={theme.color.orange}
                icon={telegramIcon}
                href="https://telegram.com"
                blank
                small
              />
              <Icon
                bg={theme.color.white}
                color={theme.color.orange}
                icon={discordIcon}
                href="https://discord.com"
                blank
                small
              />
              <Icon
                bg={theme.color.white}
                color={theme.color.orange}
                icon={twitterIcon}
                href="https://twitter.com"
                blank
                small
              />
              <Icon
                bg={theme.color.white}
                color={theme.color.orange}
                icon={githubIcon}
                href="https://github.com"
                blank
                small
              />
            </div>
          </div>
          <div
            className={cx(
              css`
                display: flex;
                flex: 1;

                @media only screen and (max-width: ${theme.breakpoint
                    .tablet}px) {
                  align-items: center;
                  flex-direction: column;
                  row-gap: ${theme.spacing.xxlarge}px;
                }
              `
            )}
          >
            {MENU.map((menu, index) => (
              <Menu key={index} {...menu} theme={theme} />
            ))}
          </div>
        </div>
        <div></div>
        <Text
          style={css`
            padding-top: 100px;
            width: 100%;

            @media only screen and (max-width: ${theme.breakpoint.tablet}px) {
              padding-top: ${theme.spacing.large}px;
              text-align: center;
            }
          `}
        >
          Made with ❤️ &nbsp; by &nbsp;
          <span>
            <Text
              gradientOne={theme.color.pink}
              gradientTwo={theme.color.green}
            >
              SecretChian Girl Foundation
            </Text>
          </span>
        </Text>
      </div>
    </div>
  )
}

export default memo(Footer)
