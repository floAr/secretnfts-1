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
    const [collections, setCollections] = React.useState<COLLECTION[]>([]);
    const [nfts, setNFTs] = React.useState<NFT[]>([]);

    //@ts-ignore
    const { address } = useParams();
    const history = useHistory()

    React.useEffect(() => {
        if (wallet.loadingWallet) return
        if (!address) return history.goBack()

        const fetchCollections = (addresses: string[]) => {
            addresses.forEach((contract, index) => {
                const coll = collectionsState.collections.get(contract)
                if (coll && coll.nfts.length > 0) return
                collectionServices.fetchFullCollection(contract, ((result: any) => {
                    if (result.error) return
                }))
            })
        }

        collectionServices.fetchCollections({ from: address }, (result: COLLECTION[]) => {
            const addresses = result.map(coll => coll.address)
            fetchCollections(addresses)
        })
    }, [address, wallet.loadingWallet]);

    React.useEffect(() => {
        const addresses = collectionsState.users.get(address) || []

        const collections: COLLECTION[] = []

        addresses.forEach((contract, index) => {
            const collection = collectionsState.collections.get(contract) || defaultCollection
            collections[index] = collection

        })

        setCollections(collections)
    }, [collectionsState]);

    React.useEffect(() => {
        let nfts: NFT[] = []

        collections.forEach((collection, index) => {
            const _nfts = [...collection.nfts]
            if (_nfts[0]) nfts.push(_nfts[0])
            if (_nfts[1]) nfts.push(_nfts[1])
        })

        setNFTs(nfts)
    }, [collections]);


    const renderInventory = () => {
        return (
            <React.Fragment>

                <AttributesBox icon={collectionIcon} title={"Collections"} className={cx(css`margin-top: ${theme.spacing.large}px;`)}>
                    <div className={cx(css`
                        display: flex;
                        flex-wrap: wrap;
                        margin-top: ${theme.spacing.medium}px;
                        width: 100%;
                        & > * {
                            padding-right: ${theme.spacing.small}px;
                            padding-bottom: ${theme.spacing.small}px;
                            min-width: 33.33%;
                            box-sizing: border-box;
                        }
                    `)}>
                        {collections.length > 0 ?
                            collections.map((coll, index) =>
                                <div key={`${index}_collection`} onClick={() => history.push(`/collection/${coll.address}`)}><CollectionCard collection={coll} /></div>)
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
                        {nfts.length > 0 ? nfts.map((nft, index) => <div key={`nft_${index}`} onClick={() => {
                            history.push(`/asset/${nft.collection}/${nft.id}`)
                        }}>
                            <NFTCard nft={nft} />
                        </div>)
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
                    Inventory
                    <Text
                        style={css`margin-left: ${theme.spacing.xxsmall}px;`}
                        weight={500}
                        size={"label"}
                        color={theme.color.black}
                    >
                        of {address}
                    </Text>
                </Text>

                {renderInventory()}
            </div>
        </div>
    )
}

