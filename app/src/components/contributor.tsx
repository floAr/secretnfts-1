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
        background: #fff;
        border: 1px solid ${theme.color.greylight};
        border-radius: ${theme.borderRadii.medium}px;
        box-sizing: border-box;
        box-shadow: 1px 4px 6px 6px ${theme.color.grey}0f;
        display: flex;
        flex-direction: column;
        height: 396px;
        padding: ${theme.spacing.medium}px;
        width: 276px;
      `)}
    >
      <div
        className={cx(css`
          background: ${theme.color.greylight};
          border-radius: 50%;
          height: 200px;
          width: 200px;
        `)}
      />
      <h3
        className={cx(css`
          color: ${theme.color.blacklight};
          font-size: 24px;
          font-weight: 500;
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
        `)}
      >
        {position}
      </p>
      <div
        className={cx(css`
          align-items: center;
          column-gap: ${theme.spacing.medium}px;
          display: flex;
          justify-content: center;
          margin-top: 24px;
          width: 100%;
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
