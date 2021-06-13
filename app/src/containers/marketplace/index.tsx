import React from 'react';
import cx from "classnames";
import { css } from '@emotion/css'
import { useHistory, useParams } from "react-router-dom";
import { ThemeContext } from '../../contexts/ThemeContext';
import { CollectionsContext } from '../../contexts/CollectionsContext';
import { WalletContext } from '../../contexts/WalletContext';
import Text from "../../components/text";
import Banner from "../../components/nftsbanner";
import { COLLECTION, defaultCollection, NFT } from '../../constants';
import CollectionCard from "../../components/collectionCard";
import NFTCard from "../../components/nftCard";
import AttributesBox from "../../components/attributebox";

import collectionIcon from "../../images/icons/collection.svg"
import defaultIcon from "../../images/icons/default.svg"


export default function Inventory() {
    const [theme] = React.useContext(ThemeContext)
    const [collectionsState, collectionServices] = React.useContext(CollectionsContext)
    const [wallet] = React.useContext(WalletContext)
    const [contracts, setContracts] = React.useState<string[]>([]);
    const [collections, setCollections] = React.useState<COLLECTION[]>([]);
    const [nfts, setNFTS] = React.useState<NFT[]>([]);

    const history = useHistory()

    React.useMemo(() => {
        if (wallet.loadingWallet) return

        const fetchCollections = (addresses: string[]) => {
            addresses.forEach((address, index) => {

                const coll = collectionsState.collections.get(address)
                if (coll && coll.nfts.length > 0) return

                collectionServices.fetchFullCollection(address, ((result: any) => {
                    if (result.error) return
                }))
            })
        }

        collectionServices.fetchCollections({ limit: 10 }, (result: COLLECTION[]) => {
            const addresses = result.map(coll => coll.address)
            setContracts(addresses)
            fetchCollections(addresses)
        })
    }, [wallet.loadingWallet]);


    React.useEffect(() => {
        if (contracts.length <= 0) return
        const _collections: COLLECTION[] = []
        contracts.forEach(address => {
            const collection = collectionsState.collections.get(address)
            _collections.push(collection || defaultCollection)
        });
        setCollections(_collections)
    }, [contracts, collectionsState]);

    React.useEffect(() => {
        if (collections.length <= 0) return
        let _nfts: NFT[] = []
        collections.forEach(collection => {
            _nfts = _nfts.concat(collection.nfts)
        });

        setNFTS(_nfts)
    }, [collections]);


    const renderCollection = (collection: COLLECTION) => {

        return (
            <div
                key={`${collection.address}_card_collection`}
                onClick={() => history.push(`/collection/${collection.address}`)}
            >
                <CollectionCard collection={collection} />
            </div>
        )
    }

    const renderNFTs = () => {
        return (
            nfts.map((nft, index) =>
                <div key={`nft_${index}`} onClick={() => {
                    history.push(`/asset/${nft.collection}/${nft.id}`)
                }}>
                    <NFTCard nft={nft} />
                </div>
            )

        )
    }

    const renderMarketplace = () => {
        return (
            <React.Fragment>

                <AttributesBox icon={collectionIcon} title={"Latest Collections"} className={cx(css`margin-top: ${theme.spacing.large}px;`)}>
                    <div className={cx(css`
                        display: flex;
                        flex-wrap: wrap;
                        margin-top: ${theme.spacing.medium}px;
                        width: 100%;
                        & > * {
                            padding-right: ${theme.spacing.small}px;
                            padding-bottom: ${theme.spacing.small}px;
                            box-sizing: border-box;
                            min-width: 33.33%; 
                        }
                    `)}>
                        {collections.length > 0 ?
                            collections.map(coll => renderCollection(coll))
                            : <Text color={theme.color.grey}>Empty</Text>}
                    </div>


                </AttributesBox>

                <AttributesBox icon={defaultIcon} title={"Latest NFTs"} className={cx(css`margin-top: ${theme.spacing.large}px;`)}>
                    <div className={cx(css`
                    display: flex;
                    flex-wrap: wrap;
                    margin-top: ${theme.spacing.medium}px;
                    & > * {
                        margin-right: ${theme.spacing.small}px;
                        margin-bottom: ${theme.spacing.small}px;
                    }
                `)}>
                        {nfts.length > 0 ?
                            renderNFTs()
                            : <Text color={theme.color.grey}>Empty</Text>}
                    </div>

                </AttributesBox>



            </React.Fragment>
        )
    }

    return (
        <div className={cx(css`
            display: flex;
            justify-content: center;
            flex-direction: column;
        `)}>
            <Banner nfts={nfts} />
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
                    Marketplace
                </Text>

                {renderMarketplace()}
            </div>
        </div>
    )
}

