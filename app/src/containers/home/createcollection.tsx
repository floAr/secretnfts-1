import React from "react";
import cx from "classnames";
import { css } from "@emotion/css";
import { ThemeContext } from "../../contexts/ThemeContext";
import { CreateNotification } from "../../contexts/HeaderContext";
import { SecretContext } from "../../contexts/SecretContext";
import { WalletContext } from "../../contexts/WalletContext";
import { CollectionsContext } from "../../contexts/CollectionsContext";
import Button from "../../components/button";
import Text from "../../components/text";
import Input from "../../components/input";
import Loader from "../../components/loader";
import Select from "../../components/select";
import { createCollection, setLocalstorage, getLocalstorage } from "../../client";
import { SIZE } from "../../components/text";
import HeadShake from 'react-reveal/HeadShake';
import { COLLECTION, LOADING, SELECT_OPTION, UNLOCK_TOKEN, WITH_VIEWINGKEY } from "../../constants";

interface COLLECTION_CREATION {
    name: string,
    symbol: string,
    loading: boolean,
    response: any,
}

const defaultCollection: COLLECTION_CREATION = {
    name: "",
    symbol: "",
    loading: false,
    response: null
}

type Props = { collectionSelected: SELECT_OPTION, onChange: Function };

export default function CreateCollection({ collectionSelected, onChange }: Props) {
    const [collection, setCollection] = React.useState<COLLECTION_CREATION>(defaultCollection);
    const [viewingkey, setViewingkey] = React.useState<string>(LOADING);
    const [loadingVK, setLoadingVK] = React.useState<boolean>(false);
    const [collectionOptions, setCollectionOptions] = React.useState<SELECT_OPTION[]>([]);


    const [theme] = React.useContext(ThemeContext);
    const [services] = React.useContext(SecretContext);
    const [wallet] = React.useContext(WalletContext);
    const [collectionsState, collectionServices] = React.useContext(CollectionsContext);


    React.useEffect(() => {
        if (!wallet.address) return
        collectionServices.fetchCollections({ from: wallet.address }, (result: COLLECTION[]) => {
            const collections = result
            const options: SELECT_OPTION[] = []
            collections.map((coll: COLLECTION) => {
                options.push({
                    value: coll.address,
                    label: `$${coll.symbol} - ${coll.name}`
                })
            })
            setCollectionOptions(options)
        })
    }, [wallet.address]);

    React.useEffect(() => {
        if (!collectionSelected) return
        const viewingkey = getLocalstorage(`${collectionSelected.value}_key`)
        setViewingkey(viewingkey ? WITH_VIEWINGKEY : UNLOCK_TOKEN)
    }, [collectionSelected]);


    React.useEffect(() => {
        if (collection.response && !collection.response.error && collection.response.collection) {
            const collectionCreated = collection.response.collection
            onChange({
                value: collectionCreated.address,
                label: `$${collectionCreated.symbol} - ${collectionCreated.name}`,
            })
        }
    }, [collection.response]);




    const onCreateCollection = () => {
        setCollection({ ...collection, loading: true })
        services.createCollection(collection.name, collection.symbol, (result: any) => {

            console.log('result', result)
            setCollection({ ...collection, loading: false })
            if (result.error) return CreateNotification(`Transaction failed!`, 5000, "error")

            const response = result.response
            if (response.error) return CreateNotification(`Error on creating collection`, 5000, "error")
            createCollection(collection.name, collection.symbol, response.contractAddress, wallet.address, (result: any) => {
                setCollection({ ...collection, loading: false, response: result })
            })
            CreateNotification(`${collection.name} created succesfully!`, 3000, "success")
        })
    }

    const onCreateViewingkey = () => {

        setLoadingVK(true)
        services.setCollectionViewingKey(collectionSelected.value, (result: any) => {
            console.log(result)
            setLoadingVK(false)
            if (result.error) return CreateNotification(`Transaction failed!`, 5000, "error")

            if (result.viewing_key) {
                setLocalstorage(`${collectionSelected.value}_key`, result.viewing_key.key)
                setViewingkey(WITH_VIEWINGKEY)
                CreateNotification("Viewing Key created succefully!")
            }

        })
    }

    return (

        <div className={cx(css`width: 100%; display: flex; justify-content: space-between;`)}>
            <div className={cx(css`width: 100%; display: flex; flex-direction: column;`)} >
                <Input
                    placeholder={`Name`}
                    label={`Collection Name *`}
                    value={collection.name}
                    onChange={(value: string) => setCollection({ ...collection, name: value })}
                    style={css`margin-bottom: ${theme.spacing.medium}px;`}
                    required
                />
                <Input
                    placeholder={`Symbol`}
                    label={`Collection Symbol *`}
                    value={collection.symbol}
                    onChange={(value: string) => setCollection({ ...collection, symbol: value.toUpperCase().trim() })}
                    style={css`margin-bottom: ${theme.spacing.medium}px;`}
                    required
                />

                <Button
                    style={css`padding: 10px; width: 100%; height: 50px; margin-top:${theme.spacing.large}px;`}
                    loading={collection.loading}
                    onClick={() => {
                        if (!collection.name || !collection.symbol)
                            return CreateNotification(`Please complete name and symbol`, 5000, "error")
                        onCreateCollection()
                    }}>
                    {collection.loading ? <div className={cx(css`display: flex; justify-content: center;`)}><Loader size={18} white={true} /></div> : `Create Collection`}
                </Button>
            </div>
            <div className={cx(css`border-left: 1px solid ${theme.color.greylight}; position: relative; margin: 0 ${theme.spacing.large}px;`)}>
                <div className={cx(css`padding: 5px; background-color: ${theme.color.white}; position: absolute; top: calc(50% - 21px); left: -13px; `)}>
                    <Text size={"label"} color={theme.color.orange}>
                        or
                        </Text>
                </div>

            </div>
            <div className={cx(css`width: 100%; display: flex; flex-direction: column;`)} >
                <Select
                    label={`Select existing Collection *`}
                    onChange={(v: any) => {
                        onChange(v)
                    }}
                    options={collectionOptions}
                    value={collectionSelected}
                />
                {viewingkey === UNLOCK_TOKEN && collectionSelected.value &&
                    <HeadShake>
                        <div className={cx(css`width: 100%; display: flex; flex-direction: column; margin-top: ${theme.spacing.large}px;`)}>
                            <div className={cx(css`display: flex; align-items: center;`)}>
                                <Text style={css`margin: ${theme.spacing.small}px 0; margin-right: ${theme.spacing.small}px;`} weight={500} size={"label"} color={theme.color.error}>Warning</Text>
                                {loadingVK && <Loader size={25} />}
                            </div>
                            <Text weight={400} size={"normal"} color={theme.color.black}>You are missing a <Text
                                size={"normal"}
                                gradientOne={theme.color.orange}
                                gradientTwo={theme.color.pink}
                                style={css`cursor: pointer;`}
                                onClick={() => {
                                    if (!collectionSelected) return
                                    onCreateViewingkey()
                                }}>
                                collection viewing key
                            </Text>,
                                to see private data from your nfts you need to create one
                            </Text>
                        </div>
                    </HeadShake>
                }
            </div>
        </div>
    );
}
