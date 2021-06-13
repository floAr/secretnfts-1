import React from 'react';
import cx from "classnames";
import { css } from '@emotion/css'
import { useHistory, useParams } from "react-router-dom";
import { ThemeContext } from '../../contexts/ThemeContext';
import { CollectionsContext } from '../../contexts/CollectionsContext';
import { WalletContext } from '../../contexts/WalletContext';
import { SecretContext } from '../../contexts/SecretContext';
import Text from "../../components/text";
import Banner from "../../components/nftsbanner";
import { SIZE } from "../../components/text";
import { COLLECTION, defaultCollection, NFT } from '../../constants';
import Loader from '../../components/loader';
import { getLocalstorage, setLocalstorage } from '../../client';
import { CreateNotification } from '../../contexts/HeaderContext';
import Modal from "../../components/modal";
import Input from "../../components/input";
import Button from "../../components/button";
import ReactTooltip from "react-tooltip";
import NFTCard from '../../components/nftCard';

import keyIcon from "../../images/icons/key.svg"
import backIcon from "../../images/icons/back.svg"
import NotFound from '../../components/notfound';


export default function MyCollection() {
    const [theme] = React.useContext(ThemeContext)
    const [wallet] = React.useContext(WalletContext)
    const [collectionsState, collectionsServices] = React.useContext(CollectionsContext)

    const [notfound, setNotfound] = React.useState<boolean>(false);

    const [services] = React.useContext(SecretContext)
    const [loadingVK, setLoadingVK] = React.useState<boolean>(false);
    const [vkModal, setVKModal] = React.useState<boolean>(false);
    const [vk, setVK] = React.useState<string>("");


    //@ts-ignore
    const { address } = useParams();
    const history = useHistory()

    React.useEffect(() => {
        if (wallet.loadingWallet) return
        if (!address) return history.goBack()

        const coll = collectionsState.collections.get(address)
        if (coll && coll.nfts.length > 0) return

        collectionsServices.fetchCollection(address, (response: any) => {
            if (response.error) return setNotfound(true)
            collectionsServices.fetchFullCollection(address, ((result: any) => { }))
        })
    }, [address, wallet.loadingWallet]);

    React.useEffect(() => {
        const vk = getLocalstorage(`${address}_key`) || ""
        setVK(vk)
    }, [address]);

    const onRotateViewingkey = (collection: COLLECTION) => {

        setLoadingVK(true)
        services.setCollectionViewingKey(collection.address, (result: any) => {
            setLoadingVK(false)
            if (result.error) return CreateNotification(`Transaction failed!`, 5000, "error")

            if (result.viewing_key) {
                setLocalstorage(`${collection.address}_key`, result.viewing_key.key)

                setVK(result.viewing_key.key)
            }

        })
    }

    const renderViewingKeyModal = (collection: COLLECTION) => {
        return (
            <Modal title={`$${collection.symbol} - Viewing Key Manager`} isOpen={vkModal} onClose={() => setVKModal(false)}>
                <div className={cx(css`
                    display: flex; 
                    flex-direction: column; 
                    min-width: 500px;
                `)}>
                    <Input placeholder={"Missing Key"} value={vk} disabled={true} onChange={() => { }} />
                    <div className={cx(css`
                            width: 100%; 
                            display: flex; 
                            margin: ${theme.spacing.medium}px 0;
                            justify-content: space-between;
                            & > * {
                                border-radius: 2px !important;
                                width: 48% !important;
                            }
                        `)}>
                        <Button loading={loadingVK} onClick={() => {
                            onRotateViewingkey(collection)
                        }}>
                            {loadingVK ? <div className={cx(css`display: flex; justify-content: center;`)}><Loader size={18} white={true} /></div> : vk ? `Rotate Key` : `Create Key`}
                        </Button>
                        {vk && <Button onClick={() => {
                            setLocalstorage(`${collection.address}_key`, "")
                            setVK("")
                        }} full={false}>Remove Key</Button>}
                    </div>
                </div>
            </Modal>
        )
    }

    const collection = collectionsState.collections.get(address) || defaultCollection

    if (notfound) return (
        <NotFound />
    )

    return (
        <div className={cx(css`
            display: flex;
            justify-content: center;
            flex-direction: column;
        `)}>

            <Banner nfts={collection.nfts} />
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
                        of {collection.from}
                    </Text>
                </Text>

                <div className={cx(css`display: flex; flex-direction: column; margin: ${theme.spacing.small}px 0;`)}>
                    <div className={cx(css`display: flex; align-items: center; cursor: pointer; width: fit-content;`)} onClick={() => {
                        history.push(`/inventory/${collection.from}`)
                    }}>
                        <img src={backIcon} width={25} />
                        <Text
                            style={css`margin-left: ${theme.spacing.small}px;`}
                            weight={500}
                            size={"label"}
                            color={theme.color.black}
                        >
                            Go Back to Inventory
                        </Text>
                    </div>

                    <div className={cx(css`display: flex; flex-direction: column;margin-top: ${theme.spacing.large}px;`)}>
                        <div className={cx(css`display: flex; align-items: flex-end;`)}>
                            <Text
                                weight={600}
                                size={"title"}
                                gradientOne={theme.color.pink}
                                gradientTwo={theme.color.orange}
                                style={css`margin-right: ${theme.spacing.small}px;`}
                            >
                                ${collection.symbol}
                            </Text>
                            <Text
                                size={"label"}
                                color={theme.color.black}
                                style={css`margin-bottom: 2px; margin-right: ${theme.spacing.small}px;`}
                            >
                                {collection.name}
                            </Text>
                            <div>

                                <img
                                    src={keyIcon}
                                    width={24}
                                    data-for="vk"
                                    data-tip={`Viewing Key Manager`}
                                    className={cx(css`cursor: pointer; margin-bottom: 2px;`)}
                                    onClick={() => setVKModal(!vkModal)}
                                />
                                <ReactTooltip
                                    id="vk"
                                    place={"top"}
                                    effect={"solid"}
                                    multiline={true}
                                />

                                {renderViewingKeyModal(collection)}

                            </div>
                        </div>

                        <div className={cx(css`display: flex; flex-wrap: wrap; margin-top: ${theme.spacing.medium}px;`)}>
                            {collection.nfts.map((nft, index) => <div
                                key={`nft_${index}`}
                                className={cx(css`margin-right: ${theme.spacing.xsmall}px; margin-bottom: ${theme.spacing.xsmall}px;`)}
                                onClick={() => history.push(`/asset/${nft.collection}/${nft.id}`)}
                            >
                                <NFTCard nft={nft} />
                            </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

