import { css } from '@emotion/css'
import cx from 'classnames'
import React from 'react'
import CreateNFT from "./createnft";
import { ThemeContext } from '../../contexts/ThemeContext'
import Contributors from './contributors'
import Header from './header'
import Subscribe from './subscribe'
import Tabs from './tabs'

export default function Home() {
  const [theme] = React.useContext(ThemeContext)

  return (
    <div
      className={cx(css`
        color: ${theme.color.white};
        display: flex;
        align-items: center;
        flex-direction: column;
      `)}
    >
      <Header />
      <Tabs />
      <CreateNFT />
      <Contributors />
      <Subscribe />
    </div>
  )
}
