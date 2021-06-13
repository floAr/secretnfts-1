import { css } from '@emotion/css'
import cx from 'classnames'
import React, { memo } from 'react'

import ContributorCard from '../../components/contributor'
import Text, { SIZE } from '../../components/text'
import { ThemeContext } from '../../contexts/ThemeContext'
import facebookIcon from '../../images/icons/facebook_f.svg'
import githubIcon from '../../images/icons/github_black.svg'
import telegramIcon from '../../images/icons/telegram_plane.svg'
import twitterIcon from '../../images/icons/twitter_black.svg'
import DUMMY from '../../images/other/dummy.png'
import JEFF from '../../images/other/jeff.png'
import KATE from '../../images/other/kate.png'
import LAURA from '../../images/other/laura.png'
import MESH_TWO from '../../images/other/mesh_2.png'
import MESH_THREE from '../../images/other/mesh_3.png'
import MESH from '../../images/other/mesh.png'
import SCGF_BRAND from '../../images/other/scgf_brand.png'
import SN_BRAND from '../../images/other/sn_brand.png'

const PEOPLE = [
  {
    image: LAURA,
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
    image: KATE,
    name: 'Kate',
    position: 'DE$IGN',
    socials: [
      { link: 'https://twitter.com/', icon: twitterIcon },
      { link: 'https://github.com/', icon: githubIcon },
    ],
  },
  {
    image: JEFF,
    name: 'Jeff',
    position: 'UX/UI Bro',
    socials: [
      { link: 'https://twitter.com/', icon: twitterIcon },
      { link: 'https://github.com/', icon: githubIcon },
      { link: 'https://telegram.com/', icon: telegramIcon },
    ],
  },
  {
    image: DUMMY,
    name: 'Name',
    position: 'Designation',
    socials: [{ link: 'https://twitter.com/', icon: twitterIcon }],
  },
]

const Contributors = () => {
  const [theme] = React.useContext(ThemeContext)

  return (
    <>
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

          @media only screen and (max-width: ${theme.breakpoint.tablet}px) {
            padding: 100px 20px;
          }

          @media only screen and (max-width: ${theme.breakpoint.mobileM}px) {
            padding: 100px 10px;
          }
        `)}
      >
        <img
          src={MESH}
          className={cx(css`
            position: absolute;
            height: 300px;
            right: -60px;
            top: 40px;
            width: 300px;
            z-index: 0;
          `)}
        />
        <img
          src={MESH_TWO}
          className={cx(css`
            position: absolute;
            height: 300px;
            left: -60px;
            top: 500px;
            width: 300px;
            z-index: 0;
          `)}
        />
        <img
          src={MESH_THREE}
          className={cx(css`
            bottom: 70px;
            position: absolute;
            height: 150px;
            right: 350px;
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
          size={"section"}
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

            @media only screen and (max-width: ${theme.breakpoint.tablet}px) {
              gap: ${theme.spacing.medium}px;
            }

            @media only screen and (max-width: ${theme.breakpoint.mobileM}px) {
              gap: ${theme.spacing.small}px;
            }
          `)}
        >
          {PEOPLE.map((person) => (
            <ContributorCard key={person.name} {...person} />
          ))}
        </div>
      </div>
      <div
        className={cx(css`
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          padding: 100px 50px;
          max-width: 1200px;
          row-gap: 200px;
        `)}
      >
        <img
          src={SCGF_BRAND}
          className={cx(css`
            max-width: 500px;
            width: 98%;
          `)}
        />
        <img
          src={SN_BRAND}
          className={cx(css`
            max-width: 400px;
            width: 95%;
          `)}
        />
      </div>
    </>
  )
}

export default memo(Contributors)
