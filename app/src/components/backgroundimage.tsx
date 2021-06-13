import { css } from '@emotion/css'
import cx from 'classnames'
import { useContext } from 'react'
import { ThemeContext } from '../contexts/ThemeContext'
import React from 'react' // we need this to make JSX compile

type Props = {
  image: string
  height?: string
  minHeight?: string
  width?: string
  bg?: string
  type?: "contain" | "cover"
}

export default function BackgroundImage({ image, height, minHeight, width, bg, type = "contain" }: Props) {

  const [theme] = useContext(ThemeContext)

  return (
    <div className={cx(css`
      width: ${width || `100%`}; 
      background-color: ${bg || theme.color.black}11; 
      height: ${height || `350px`}; 
      min-height: ${minHeight || `350px`}; 
    `)}>
      <div className={cx(css`
            height: 100%;
            width: 100%;
            background: url(${image}) no-repeat center center; 
            -webkit-background-size: ${type};
            -moz-background-size: ${type};
            -o-background-size: ${type};
            background-size: ${type};
        `)}>
      </div>
    </div>
  )
}
