import React from 'react';
import cx from "classnames";
import { css } from '@emotion/css'
import { useHistory, useParams } from "react-router-dom";
import { ThemeContext } from '../../contexts/ThemeContext';
import { CollectionsContext } from '../../contexts/CollectionsContext';
import { WalletContext } from '../../contexts/WalletContext';
import { SecretContext } from '../../contexts/SecretContext';
import Text from "../../components/text";
import AttributesBox from "../../components/attributebox";
import { COLLECTION, defaultCollection, defaultNFT, NFT, PROPERTY } from '../../constants';
import Banner from "../../components/nftsbanner";
import NotFound from '../../components/notfound';
import { urlIPFSAsset } from '../../utils';
import BackgroundImage from '../../components/backgroundimage';
import ContentLoader from 'react-content-loader'


import descriptionIcon from "../../images/icons/description.svg";
import rotateIcon from "../../images/icons/rotate.svg";
import backIcon from "../../images/icons/back.svg"
import publicIcon from "../../images/icons/public.svg";
import privateIcon from "../../images/icons/private.svg";
import protectIcon from "../../images/icons/protect.svg";
import defaultIcon from "../../images/icons/default.svg"

export default function MyCollection() {
    const [theme] = React.useContext(ThemeContext)
    const [wallet] = React.useContext(WalletContext)
    const [collectionsState, collectionsServices] = React.useContext(CollectionsContext)

    const [notfound, setNotfound] = React.useState<boolean>(false);
    const [showingOriginal, setShowingOriginal] = React.useState<boolean>(true);

    const [services] = React.useContext(SecretContext)

    //@ts-ignore
    const { contract, token_id } = useParams();
    const history = useHistory()

    React.useEffect(() => {
        if (wallet.loadingWallet) return
        if (!token_id || !contract) return history.goBack()

        const coll = collectionsState.collections.get(contract) || defaultCollection

        const nft = coll.nfts.find(asset => asset.id === token_id)
        if (nft) return


        collectionsServices.fetchFullCollection(contract, async (result: any) => {
            if (result.error) return setNotfound(true)
        })

    }, [contract, token_id, wallet.loadingWallet]);

    const renderLoader = () => {
        return (
            <ContentLoader
                backgroundColor={'#dfe9a5'}
                foregroundColor={'#e6e0e0'}
                style={{ height: '630px', width: '100%' }}
            >
                <rect x="0%" y="0%" rx="5" ry="5" width="20%" height="20px" />
                <rect x="0%" y="30" rx="5" ry="5" width="50%" height="100%" />
                <rect x="51%" y="30" rx="5" ry="5" width="100%" height="110px" />
                <rect x="51%" y="160" rx="5" ry="5" width="100%" height="110px" />
                <rect x="51%" y="300" rx="5" ry="5" width="100%" height="110px" />
                <rect x="51%" y="440" rx="5" ry="5" width="100%" height="110px" />

            </ContentLoader>
        )
    }

    const renderProperty = (label: string, value: string) => {
        return (
            <div className={cx(css`
                display: flex;
                justify-content: center;
                flex-direction: column;
                border: 1px solid ;
                border-image:linear-gradient(45deg,${theme.color.purplelight},${theme.color.blue}) 10;
                border-radius: 5px;
                padding:${theme.spacing.small}px;
                min-width: 100px;
            `)}>
                <Text weight="400" size={"label"} gradientOne={theme.color.purplelight} gradientTwo={theme.color.blue}>{label}</Text>
                {value && <Text style={css`margin-top: ${theme.spacing.xxsmall}px;`} weight="400" color={theme.color.black}>{value}</Text>}
            </div>
        )
    }

    const collection: COLLECTION = collectionsState.collections.get(contract) || defaultCollection
    const nft: NFT = collection.nfts.find((nft => nft.id === token_id)) || defaultNFT


    if (notfound) return (
        <NotFound />
    )
    const urlOriginal = nft.image ? urlIPFSAsset(nft.image) : ""
    const urlThumbnail = nft.thumbnail ? urlIPFSAsset(nft.thumbnail) : ""

    let image = urlOriginal
    if (urlThumbnail && !showingOriginal) image = urlThumbnail
    if (!urlOriginal) image = urlThumbnail
    if (!nft.thumbnail && !urlOriginal) image = defaultIcon

    return (
        <div className={cx(css`
            display: flex;
            justify-content: center;
            flex-direction: column;
        `)}>
            <Banner nfts={[nft]} />

            <div className={cx(css`
                display: flex;
                flex-direction: column;
                flex: 1;
                padding: 50px 100px;
                min-height: 60vh;
            `)}>

                <Text
                    weight={600}
                    size={"title"}
                    gradientOne={theme.color.pink}
                    gradientTwo={theme.color.orange}
                >
                    {collection.name}
                    <Text
                        style={css`margin-left: ${theme.spacing.xxsmall}px;`}
                        weight={500}
                        size={"label"}
                    >
                        of {collection.from}
                    </Text>
                </Text>

                <div className={cx(css`display: flex; flex-direction: column; margin: ${theme.spacing.small}px 0;`)}>
                    <div className={cx(css`display: flex; align-items: center; cursor: pointer; width: fit-content;`)} onClick={() => {
                        history.push(`/collection/${collection.address}`)
                    }}>
                        <img src={backIcon} width={25} />
                        <Text
                            style={css`margin-left: ${theme.spacing.small}px;`}
                            weight={500}
                            size={"label"}
                            color={theme.color.black}
                        >
                            Go Back to Collection
                        </Text>
                    </div>

                    <Text
                        style={css`margin-top: ${theme.spacing.large}px;`}
                        weight={600}
                        size={"title"}
                        gradientOne={theme.color.pink}
                        gradientTwo={theme.color.orange}
                    >
                        {nft.name}
                    </Text>
                    {nft.collection ? <div className={cx(css`display: flex; margin-top: ${theme.spacing.small}px;`)}>
                        <div className={cx(css`display: flex; flex-direction: column; width: 100%;`)}>

                            <div className={cx(css`display: flex; flex-direction: column; width: 100%; position: relative;`)}>

                                <div className={cx(css`
                                    position: absolute; 
                                    top: 0; 
                                    padding: 7px; 
                                    left: 0;
                                    background-color: ${theme.color.black}77;
                                    display: flex;
                                    align-items: center;
                                `)}>
                                    {urlOriginal && urlThumbnail && <img
                                        src={rotateIcon}
                                        width={20}
                                        className={cx(css`cursor: pointer; margin-right: ${theme.spacing.xsmall}px;`)}
                                        onClick={() => setShowingOriginal(!showingOriginal)}
                                    />}
                                    <Text weight="400">{image === defaultIcon ? `Default Thumbnail` : (image === urlOriginal ? `Original` : `Thumbnail`)}</Text>
                                </div>
                                <div className={cx(css`    
                                    border-radius: 5px;
                                    border: 1px solid ${theme.color.greylight};
                                `)}>
                                    <BackgroundImage height={'60vh'} minHeight={"600px"} image={image} />

                                </div>

                            </div>

                        </div>

                        <div className={cx(css`
                            display: flex; 
                            flex-direction: column; 
                            width: 100%; 
                            padding: 0 ${theme.spacing.medium}px;
                            & > * {
                                margin-bottom: ${theme.spacing.xsmall}px;
                            }
                            
                        `)}>
                            <AttributesBox icon={descriptionIcon} title={"Description"}>
                                <Text weight="400" color={theme.color.grey}>{nft.description}</Text>
                            </AttributesBox>

                            <AttributesBox icon={privateIcon} title={"Private Properties"}>
                                <div className={cx(css`
                                    display: flex; 
                                    flex-wrap: wrap;
                                    & > * {
                                        margin-bottom: ${theme.spacing.xsmall}px;
                                        margin-right: ${theme.spacing.xsmall}px;
                                    }
                                    
                                `)}>
                                    {Object.keys(nft.private_properties).map((property: string, index) => {
                                        return <div key={`private_${index}`}>
                                            {renderProperty(property, nft.private_properties[property])}
                                        </div>
                                    })}
                                </div>

                            </AttributesBox>

                            <AttributesBox icon={protectIcon} title={"Ptotected Properties"}>

                                <div className={cx(css`
                                    display: flex; 
                                    flex-wrap: wrap;
                                    & > * {
                                        margin-bottom: ${theme.spacing.xsmall}px;
                                        margin-right: ${theme.spacing.xsmall}px;
                                    }
                                    
                                `)}>
                                    {nft.protected_properties.map((property: string, index) => {
                                        return <div key={`protected_${index}`}>{renderProperty(property, "")}</div>
                                    })}
                                </div>
                            </AttributesBox>

                            <AttributesBox icon={publicIcon} title={"Public Properties"}>
                                <div className={cx(css`
                                    display: flex; 
                                    flex-wrap: wrap;
                                    & > * {
                                        margin-bottom: ${theme.spacing.xsmall}px;
                                        margin-right: ${theme.spacing.xsmall}px;
                                    }
                                    
                                `)}>
                                    {Object.keys(nft.public_properties).map((property: string, index) => {
                                        return <div key={`public_${index}`}>
                                            {renderProperty(property, nft.public_properties[property])}
                                        </div>
                                    })}
                                </div>
                            </AttributesBox>

                        </div>
                    </div> : renderLoader()}
                </div>
            </div>
        </div>
    )
}

