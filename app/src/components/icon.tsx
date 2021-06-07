import { css } from '@emotion/css'
import cx from 'classnames'
import React from 'react' // we need this to make JSX compile

type Props = {
  color: string
  icon: string
  href: string
  blank: boolean
  small?: boolean
  bg?: string
}

export default function Icon({ color, icon, href, blank, small, bg }: Props) {
  return (
    <a
      href={href}
      target={blank ? '_blank' : ''}
      className={cx(css`
        border-radius: 100%;
        width: ${small ? '32px' : '40px'};
        height: ${small ? '32px' : '40px'};
        background-color: ${bg || 'rgba(0, 0, 0, 0.6)'};
        transition: all 0.2s ease-in-out;
        display: flex;
        justify-content: center;
        align-items: center;
        :hover {
          background-color: ${color};
        }
      `)}
    >
      <img
        src={icon}
        width={small ? '16px' : '20px'}
        height={small ? '16px' : '20px'}
        alt={href}
      />
    </a>
  )
}
