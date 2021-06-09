import { css } from '@emotion/css'
import cx from 'classnames'
import { FC, memo, useContext } from 'react'

import { ThemeContext } from '../contexts/ThemeContext'
import Icon from './icon'

interface Social {
  link: string
  icon: string
}

type Props = {
  image: string
  name: string
  position: string
  socials: Social[]
}

const ContributorCard: FC<Props> = ({ name, image, position, socials }) => {
  const [theme] = useContext(ThemeContext)

  return (
    <div
      className={cx(css`
        align-items: center;
        aspect-ratio: 0.7;
        background: #fff;
        border: 1px solid ${theme.color.greylight};
        border-radius: ${theme.borderRadius.medium}px;
        box-sizing: border-box;
        box-shadow: 1px 4px 6px 6px ${theme.color.grey}0f;
        display: flex;
        flex-direction: column;
        padding: ${theme.spacing.medium}px;
        width: 275px;

        @media only screen and (max-width: ${theme.breakpoint.tablet}px) {
          padding: ${theme.spacing.small}px;
          width: 200px;
        }

        @media only screen and (max-width: ${theme.breakpoint.mobileM}px) {
          padding: ${theme.spacing.xsmall}px;
          width: 170px;
        }
      `)}
    >
      <img
        src={image}
        className={cx(css`
          border-radius: 50%;
          width: 85%;
        `)}
      />
      <h3
        className={cx(css`
          color: ${theme.color.blacklight};
          font-size: 24px;
          font-weight: 500;

          @media only screen and (max-width: ${theme.breakpoint.tablet}px) {
            font-size: 16px;
          }

          @media only screen and (max-width: ${theme.breakpoint.mobileM}px) {
            margin: ${theme.spacing.small}px 0;
            font-size: 14px;
          }
        `)}
      >
        {name}
      </h3>
      <p
        className={cx(css`
          color: ${theme.color.blacklight};
          font-size: 16px;
          font-weight: 400;
          letter-spacing: 0.15px;
          margin: 0;

          @media only screen and (max-width: ${theme.breakpoint.tablet}px) {
            font-size: 14px;
          }

          @media only screen and (max-width: ${theme.breakpoint.mobileM}px) {
            font-size: 12px;
          }
        `)}
      >
        {position}
      </p>
      <div
        className={cx(css`
          /* border: 1px solid red; */
          align-items: center;
          column-gap: ${theme.spacing.medium}px;
          display: flex;
          justify-content: center;
          margin-top: 24px;
          width: 100%;

          @media only screen and (max-width: ${theme.breakpoint.tablet}px) {
            column-gap: ${theme.spacing.small}px;
            margin-top: 15px;
          }

          @media only screen and (max-width: ${theme.breakpoint.mobileM}px) {
            column-gap: ${theme.spacing.xsmall}px;
            margin-top: 10px;
          }
        `)}
      >
        {socials.map(({ link, icon }) => (
          <Icon
            key={link}
            icon={icon}
            href={link}
            color={`${theme.color.pink}`}
            blank
            small
            bg={theme.color.white}
          />
        ))}
      </div>
    </div>
  )
}

export default memo(ContributorCard)
