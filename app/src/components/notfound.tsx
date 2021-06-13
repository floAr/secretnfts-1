import { css } from '@emotion/css'
import cx from 'classnames'
import React from 'react'
import { useHistory } from "react-router-dom";

import { ThemeContext } from '../contexts/ThemeContext'

import Text from './text'
import Button from './button'
import { SIZE } from './text'

export default function NotFound() {
  const [theme] = React.useContext(ThemeContext)
  const history = useHistory()

  return (
    <div
      className={cx(css`
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        height: 80vh;
      `)}
    >
      <Text
        weight={600}
        size={"section"}
        gradientOne={theme.color.pink}
        gradientTwo={theme.color.orange}
      >
        wooow, path not found! :(
      </Text>
      <Button style={css`margin-top: ${theme.spacing.large}px;`} full={false} onClick={() => history.push('/')}>Take me back to safety</Button>
    </div>
  )
}
