import { css } from '@emotion/css'
import cx from 'classnames'
import React, { memo } from 'react'

import ContributorCard from '../../components/contributor'
import Text, { SIZE } from '../../components/text'
import { ThemeContext } from '../../contexts/ThemeContext'
import facebookIcon from '../../images/icons/facebook_f.svg'
import githubIcon from '../../images/icons/github.svg'
import telegramIcon from '../../images/icons/telegram_plane.svg'
import twitterIcon from '../../images/icons/twitter.svg'
import ball from '../../images/other/ball.png'

const PEOPLE = [
  {
    image: '',
    name: 'Laura Weindorf',
    position: 'Founder',
    socials: [
      { link: 'https://facebook.com/', icon: facebookIcon },
      { link: 'https://twitter.com/', icon: twitterIcon },
      { link: 'https://github.com/', icon: githubIcon },
      { link: 'https://telegram.com/', icon: telegramIcon },
    ],
  },
  {
    image: '',
    name: 'Kate',
    position: 'DE$IGN',
    socials: [
      { link: 'https://twitter.com/', icon: twitterIcon },
      { link: 'https://github.com/', icon: githubIcon },
    ],
  },
  {
    image: '',
    name: 'Jeff',
    position: 'UX/UI Bro',
    socials: [
      { link: 'https://twitter.com/', icon: twitterIcon },
      { link: 'https://github.com/', icon: githubIcon },
      { link: 'https://github.com/', icon: githubIcon },
    ],
  },
  {
    image: '',
    name: 'Name',
    position: 'Designation',
    socials: [{ link: 'https://twitter.com/', icon: twitterIcon }],
  },
]

const Contributors = () => {
  const [theme] = React.useContext(ThemeContext)

  return (
    <div
      className={cx(css`
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        padding: 100px 50px;
        max-width: 1200px;
        position: relative;
      `)}
    >
      <img
        src={ball}
        className={cx(css`
          position: absolute;
          height: 300px;
          right: -60px;
          top: 20px;
          transform: rotate(150deg);
          width: 300px;
          z-index: 0;
        `)}
      />
      <img
        src={ball}
        className={cx(css`
          position: absolute;
          height: 300px;
          left: -60px;
          top: 500px;
          transform: rotate(180deg);
          width: 300px;
          z-index: 0;
        `)}
      />
      <img
        src={ball}
        className={cx(css`
          bottom: 100px;
          position: absolute;
          height: 150px;
          right: 300px;
          transform: rotate(150deg);
          width: 150px;
          z-index: 0;
        `)}
      />
      <span
        className={cx(css`
          height: 3px;
          width: 35px;
          margin-bottom: ${theme.spacing.medium}px;
          position: relative;
          background: linear-gradient(
            to right,
            ${theme.color.orange},
            ${theme.color.pink}
          );
        `)}
      />
      <Text
        weight={'500'}
        gradientOne={theme.color.orange}
        gradientTwo={theme.color.pink}
        size={SIZE.section}
        style={css(`margin-bottom: 50px; position: relative;`)}
      >
        Contributors
      </Text>
      <div
        className={cx(css`
          column-gap: ${theme.spacing.large}px;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-evenly;
          row-gap: 60px;
          position: relative;
          width: 100%;
        `)}
      >
        {PEOPLE.map((person) => (
          <ContributorCard key={person.name} {...person} />
        ))}
      </div>
    </div>
  )
}

export default memo(Contributors)
