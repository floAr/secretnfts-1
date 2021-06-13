import { css } from '@emotion/css'
import cx from 'classnames'
import React from 'react'
import CreateNFT from "./createnft";
import NFTSteps from "./nftsteps";
import CreateCollection from "./createcollection";
import { ThemeContext } from '../../contexts/ThemeContext'
import Contributors from './contributors'
import Header from './header'
import Subscribe from './subscribe'
import Tabs from './tabs'
import { SELECT_OPTION } from '../../constants';

export default function Home() {
  const [theme] = React.useContext(ThemeContext)
  const [collection, setCollection] = React.useState<SELECT_OPTION>({ value: "", label: "" });


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
      <div className={cx(css`
          display: flex;
          flex-direction: column;
          width: 100%;
          max-width: 1200px;

          & > * {
            width: 100%;
            padding: 50px;
            box-sizing: border-box;
          }
        `)}
      >
        <Tabs />
        <NFTSteps />
        <CreateCollection collectionSelected={collection} onChange={(coll: any) => setCollection(coll)} />
        <CreateNFT collection={collection} />
        <Contributors />

      </div>

      <Subscribe />
    </div>
  )
}
