import React from 'react'; // we need this to make JSX compile
import cx from "classnames";
import { css } from '@emotion/css'
import Text from "./text"
import { ThemeContext } from '../contexts/ThemeContext';
import { CollectionsContext } from '../contexts/CollectionsContext';
import { NFT } from '../constants';
import { urlIPFSAsset } from '../utils';
import ContentLoader from 'react-content-loader'

import defaultIcon from "../images/icons/default.svg"
import publicIcon from "../images/icons/public.svg";
import privateIcon from "../images/icons/private.svg";
import protectIcon from "../images/icons/protect.svg";

type Props = { nft: NFT }

export const NFTLoader = () => {
    return (
        <ContentLoader
            backgroundColor={'#dddedf'}
            foregroundColor={'#e6e0e0'}
            style={{ height: '450px', width: '285px' }}
        >
            <rect x="0" y="0" rx="5" ry="5" width="280" height="350" />
            <rect x="0" y="360" rx="3" ry="3" width="120" height="5" />
            <rect x="0" y="370" rx="3" ry="3" width="120" height="5" />
            <rect x="0" y="380" rx="3" ry="3" width="100" height="5" />
        </ContentLoader>
    )
}


function NFTCard({
    nft
}: Props) {
    const [theme] = React.useContext(ThemeContext)
    const [collectionsState] = React.useContext(CollectionsContext)

    const fileHash = nft.image || nft.thumbnail || ""
    const fileURL = fileHash ? urlIPFSAsset(fileHash) : defaultIcon
    const defaultThumbnail = !fileHash

    const renderNumberProperties = (image: any, label: string, number: string | number) => {

        return (
            <div className={cx(css`display: flex; margin-top: ${theme.spacing.small}px; align-items: center;`)}>
                <img width={15} src={image} />
                <Text
                    style={css`margin: 0 ${theme.spacing.xxsmall}px;`}
                    size={"normal"}
                    color={theme.color.black}
                    weight={400}
                >
                    {label}
                </Text>
                <Text
                    style={css`margin-right: ${theme.spacing.xxsmall}px;`}
                    size={"normal"}
                    color={theme.color.orange}
                >
                    {number}
                </Text>
            </div>
        )
    }

    if (nft.loading) return <NFTLoader />


    const collectionName = collectionsState.collections.get(nft.collection)
    return (
        <div className={cx(css`
            display: flex; 
            flex-direction: column;
            border: 1px solid ${theme.color.greylight}; 
            padding: 8px;
            width: 285px;
            &:hover {
                cursor: pointer;
                transform: translateY(-2px);
                box-shadow: rgb(14 14 14 / 25%) 0px 0px 8px 0px;
                transition: all 0.3s ease 0s;
            }
        `)}>
            <div className={cx(css`background-color: ${theme.color.black}11; position: relative;`)}>
                <div className={cx(css`
                    height: 250px;
                    width: 100%;
                    background: url(${fileURL}) no-repeat center center; 
                    -webkit-background-size: contain;
                    -moz-background-size: contain;
                    -o-background-size: contain;
                    background-size: contain;
                `)}>
                </div>
                <div className={cx(css`position: absolute; bottom: 0; right: 0; padding: 3px; background-color: ${theme.color.black}55;`)}>
                    <Text size={"note"} weight={400}>{defaultThumbnail ? `Default Thumbnail` : (nft.image ? `Original` : `Thumbnail`)}</Text>
                </div>
            </div>


            <div className={cx(css`display: flex; margin-top: ${theme.spacing.medium}px; flex-direction: column;`)}>
                <Text
                    size={"label"}
                    gradientOne={theme.color.pink}
                    gradientTwo={theme.color.orange}
                >
                    {nft.name}
                </Text>

                <Text
                    style={css`margin-top: ${theme.spacing.xxsmall}px;`}
                    weight={400}
                    size={"normal"}
                    color={theme.color.grey}
                >
                    {collectionName ? collectionName.name : ""}
                </Text>

                {renderNumberProperties(privateIcon, `Private Properties`, nft.private_metadata ? Object.keys(
                    nft.private_properties || {}).length : `Unknown`)}
                {renderNumberProperties(protectIcon, `Protected Properties`, nft.protected_properties?.length || 0)}
                {renderNumberProperties(publicIcon, `Public Properties`, Object.keys(nft.public_properties || {}).length)}

            </div>


        </div>
    )
}

export default React.memo(NFTCard)
