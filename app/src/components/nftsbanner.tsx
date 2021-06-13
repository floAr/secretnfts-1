import React from 'react'; // we need this to make JSX compile
import cx from "classnames";
import { css } from '@emotion/css'
import { ThemeContext } from '../contexts/ThemeContext';
import { NFT } from '../constants';
import { urlIPFSAsset } from '../utils';
import background from "../images/other/background.svg";
import { NFTLoader } from "../components/nftCard"

type Props = { nfts: (NFT)[] }

export default function NFTsBanner({ nfts }: Props) {

  const [theme] = React.useContext(ThemeContext)


  return <div className={cx(css`
    display: flex;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    background-image: url(${background});
    height: 300px;
    overflow: hidden;
    -webkit-box-shadow: 0px 2px 10px -1px ${theme.color.black}; 
    box-shadow: 0px 2px 10px -1px ${theme.color.black};
  `)}>
    {nfts.map((nft, index) => {
      const url = urlIPFSAsset(nft.image || nft.thumbnail || "")
      return (
        <div key={`${index}_image_banner`} className={cx(css`
                box-sizing: border-box;
                background-color: ${theme.color.black}55; 
                border-right: 1px solid ${theme.color.pink};
                width: 100%;
                min-width: 20%;
            `)}>
          <div className={cx(css`
                      height: 100%;
                      width: 100%;
                      background: url(${url}) no-repeat center center; 
                      -webkit-background-size: cover;
                      -moz-background-size: cover;
                      -o-background-size: cover;
                      background-size: cover;
                  `)}>
          </div>
        </div>)
    })}
  </div>
}



