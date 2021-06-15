import React from "react";
import cx from "classnames";
import { css } from "@emotion/css";
import { ThemeContext } from "../../contexts/ThemeContext";
import { CreateNotification } from "../../contexts/HeaderContext";
import { SecretContext } from "../../contexts/SecretContext";
import { WalletContext } from "../../contexts/WalletContext";
import Button from "../../components/button";
import Dropzone from "../../components/dropzone";
import Text from "../../components/text";
import Input from "../../components/input";
import Textarea from "../../components/textarea";
import Toggle from "../../components/toggle";
import Loader from "../../components/loader";
import Modal from "../../components/modal";
import { SIZE } from "../../components/text";
import IPFS from "ipfs-api";
import Flip from 'react-reveal/Flip';
import ReactTooltip from "react-tooltip";
import Jump from 'react-reveal/Jump';

import rotateIcon from "../../images/icons/rotate.svg";
import minusIcon from "../../images/icons/minus.svg";
import plusIcon from "../../images/icons/plus.svg";
import publicIcon from "../../images/icons/public.svg";
import privateIcon from "../../images/icons/private.svg";
import protectIcon from "../../images/icons/protect.svg";
import questionIcon from "../../images/icons/question.svg";
import { PROPERTY, PROPERTY_TYPE, SELECT_OPTION } from "../../constants";
import { useHistory } from "react-router";
import { CollectionsContext } from "../../contexts/CollectionsContext";
import BackgroundImage from "../../components/backgroundimage";

interface NFT_CREATION {
    name: string,
    description: string,
    protected: boolean,
    imageHash: string,
    thumbnailHash: string,
    properties: PROPERTY[]
}

interface FILE_TO_UPLOAD {
    buffer: any,
    name: string,
    original: boolean,
}

interface RESULT {
    loading: boolean,
    error: boolean,
    hash?: string,
    token_id?: string,
}


const defaultNFT: NFT_CREATION = {
    name: "",
    protected: false,
    description: "",
    imageHash: "",
    thumbnailHash: "",
    properties: []
}

const defaultResult: RESULT = {
    loading: false,
    error: false,
    hash: "",
    token_id: "",
}

const ipfs = new IPFS({
    host: "ipfs.infura.io",
    port: 5001,
    protocol: "https",
})

type Props = { collection: SELECT_OPTION };

export default function CreateNFT({ collection }: Props) {
    const [nft, setNFT] = React.useState<NFT_CREATION>(defaultNFT);
    const [showThumbnail, setShowThumbnail] = React.useState<boolean>(false);
    const [result, setResult] = React.useState<RESULT>(defaultResult);
    const [modal, setModal] = React.useState<boolean>(false);

    const [imageFile, setImageFile] = React.useState<{ preview: string, buffer: any }>();
    const [thumbnailFile, setThumbnailFile] = React.useState<{ preview: string, buffer: any }>();

    const [theme] = React.useContext(ThemeContext);
    const [services] = React.useContext(SecretContext);
    const [wallet] = React.useContext(WalletContext);
    const [, collservices] = React.useContext(CollectionsContext);

    const history = useHistory()

    const onDropImage = (uploaded: any) => {
        console.log('onDropImage', uploaded)
        setImageFile({ preview: uploaded.file.preview, buffer: uploaded.buffer })

    };

    const onDropThumbnail = (uploaded: any) => {
        console.log('onDropThumbnail', uploaded)
        setThumbnailFile({ preview: uploaded.file.preview, buffer: uploaded.buffer })
    };


    const onCreateNFT = async () => {
        if (!nft.name || !imageFile) return CreateNotification(`Please add name and a media file`, 5000, "error")
        let hasBlank = false
        nft.properties.forEach((property: PROPERTY) => {
            if (!property.value || !property.label) hasBlank = true
        })
        if (hasBlank) return CreateNotification(`Missing property fields`, 5000, "error")

        setResult({ ...result, loading: true })
        const uploadPromise = (file: FILE_TO_UPLOAD) => new Promise(async (resolve, reject) => {
            if (file.buffer) {
                ipfs.add(file.buffer, (err: any, result: any) => {
                    if (!result[0] || err) return resolve({ error: true, file, message: err });
                    resolve({ error: false, file, hash: result[0].hash });
                });
            } else {
                resolve({ error: true, file });
            }
        });

        const image: FILE_TO_UPLOAD = {
            buffer: imageFile.buffer,
            name: `Original File`,
            original: true
        }

        const promises = [uploadPromise(image)];


        let thumbnail: FILE_TO_UPLOAD = { buffer: null, name: "", original: false }
        if (thumbnailFile) {
            thumbnail = {
                buffer: thumbnailFile.buffer,
                name: `Thumbnail File`,
                original: false
            }
            promises.push(uploadPromise(thumbnail))
        }

        let imageHash: string = ""
        let thumbnailHash: string = ""

        CreateNotification(`Uploading files to ipfs...`, 4000)

        Promise.all(promises).then((results) => {
            results.forEach((result: any) => {
                if (result.error) return CreateNotification(
                    `Could not upload your ${result.file.original ? 'original' : 'thumbnail'} file to ipfs`,
                    3000,
                    "error"
                )

                CreateNotification(
                    `${result.file.original ? 'Original' : 'Thumbnail'} file uploaded succefully!`,
                    3000,
                    "info"
                )

                if (result.file.original) imageHash = result.hash
                if (!result.file.original) thumbnailHash = result.hash

            })

            const public_metadata: any = {
                description: nft.description,
                thumbnail: thumbnailHash
            }

            const private_metadata: any = {}
            const protected_properties: any = []
            nft.properties.map((property: PROPERTY) => {
                if (property.type === PROPERTY_TYPE.PRIVATE) private_metadata[property.label] = property.value
                if (property.type === PROPERTY_TYPE.PROTECTED) {
                    private_metadata[property.label] = property.value
                    protected_properties.push(property.label)
                }
                if (property.type === PROPERTY_TYPE.PUBLIC) public_metadata[property.label] = property.value
            })

            public_metadata["protected_properties"] = protected_properties

            const mint_nft = {
                public_metadata: {
                    name: nft.name,
                    image: !nft.protected ? imageHash : "",
                    description: JSON.stringify(public_metadata)
                },
                private_metadata: {
                    name: "",
                    image: nft.protected ? imageHash : "",
                    description: JSON.stringify(private_metadata)
                }
            }

            console.log('mint_nft', mint_nft)

            services.createNFT(mint_nft, collection.value, (response: any) => {
                setResult({ ...result, loading: false, error: response.error, token_id: response.token_id })

                if (response.error) {
                    console.log(response.message)
                    return CreateNotification("Transaction failed!", 5000, "error")
                }

                if (response.token_id) {
                    setModal(true)
                    CreateNotification(`NFT created succefully!`, 5000, "success")
                    collservices.fetchFullCollection(collection.value, () => { })

                }


            })

        });


    }


    React.useEffect(() => {
        setShowThumbnail(nft.protected)
    }, [nft.protected]);

    const renderShield = (icon: any, label: string, id: string, description: string) => {

        return (
            <div
                data-for={id}
                data-tip={description}
                className={cx(css`
                display: flex; 
                cursor: pointer;
                align-items:center;
                & > * {
                    margin-right: ${theme.spacing.xxsmall}px;
                }
            `)}>
                <img src={icon} width={20} />
                <Text weight={600} size={"normal"} color={theme.color.black}>{label}</Text>
                <img
                    src={questionIcon}
                    width={12}

                />
                <ReactTooltip
                    id={id}
                    place={"top"}
                    effect={"solid"}
                    multiline={true}
                />
            </div>
        )
    }

    const renderProperties = () => {

        const renderPropertie = (propertie: PROPERTY, index: number) => {
            return (
                <div key={index} className={cx(css`
                    display: flex; 
                    margin-bottom: ${theme.spacing.small}px; 
                    align-items: center;
                    justify-content: flex-start;
                    & > * {
                        margin-right: ${theme.spacing.xsmall}px; 
                    }
                `)}>
                    <Input placeholder={`Name`} onChange={(v: string) => {
                        const properties = nft.properties
                        properties[index].label = v
                        setNFT({ ...nft, properties: properties })
                    }} value={propertie.label}></Input>
                    <Input placeholder={`Value`} onChange={(v: string) => {
                        const properties = nft.properties
                        properties[index].value = v
                        setNFT({ ...nft, properties: properties })
                    }} value={propertie.value}></Input>
                    <Flip left spy={propertie.type}>
                        <img
                            width={30}
                            src={
                                propertie.type === PROPERTY_TYPE.PRIVATE ?
                                    privateIcon :
                                    propertie.type === PROPERTY_TYPE.PROTECTED ?
                                        protectIcon :
                                        publicIcon
                            }
                            className={cx(css`cursor: pointer;`)}
                            onClick={() => {
                                const properties = nft.properties

                                properties[index].type = properties[index].type === PROPERTY_TYPE.PRIVATE ?
                                    PROPERTY_TYPE.PUBLIC :
                                    properties[index].type === PROPERTY_TYPE.PUBLIC ?
                                        PROPERTY_TYPE.PROTECTED :
                                        PROPERTY_TYPE.PRIVATE

                                CreateNotification(
                                    `Property ${properties[index].label} is now ${properties[index].type}`,
                                    3000
                                )
                                setNFT({ ...nft, properties: properties })
                            }} />


                    </Flip>
                    <img className={cx(css`cursor: pointer;`)} width={30} src={minusIcon} onClick={() => {
                        const properties = nft.properties
                        properties.splice(index, 1);
                        setNFT({ ...nft, properties: properties })
                    }} />

                </div>)
        }

        return <div className={cx(css`
                display: flex; 
                flex-direction: column;
                margin-top: ${theme.spacing.large}px; 
      
                
            `)}>
            {nft.properties.map((propertie: PROPERTY, index) => renderPropertie(propertie, index))}
            <div className={cx(css`display: flex; align-items: center;`)}>
                <img width={30} src={plusIcon} className={cx(css`cursor: pointer;margin-right: ${theme.spacing.xsmall}px;`)} onClick={() => {
                    const properties = nft.properties
                    properties.push({ value: "", label: "", type: PROPERTY_TYPE.PUBLIC })
                    setNFT({ ...nft, properties: properties })

                }} />
                <Text weight={400} color={theme.color.black} size={"label"}>{`Add ${nft.properties.length > 0 ? `another` : ``} property`}</Text>
            </div>
        </div>
    }

    return (
        <div className={cx(css`
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
        `)}
        >

            <Jump spy={collection}>

                <div className={cx(css`
                    width: 100%; 
                    display: flex; 
                    justify-content: space-between; 
                    position: relative;
                `)}>
                    {!collection.value && <div className={cx(css`z-index: 3; width: 100%; height: 100%; position: absolute; background-color:${theme.color.white}88;`)}></div>}

                    <div className={cx(css`width: 100%; display: flex; flex-direction: column;`)} >
                        <div className={cx(css`height: 18px;margin-bottom: ${theme.spacing.small}px; `)}>
                            {nft.protected &&
                                <Flip left>
                                    <img
                                        src={rotateIcon}
                                        width={24}
                                        data-for="main"
                                        data-tip={`Flip to ${showThumbnail ? `your protected nft` : `your public thumbnail`}`}
                                        className={cx(css`cursor: pointer;`)}
                                        onClick={() => setShowThumbnail(!showThumbnail)}
                                    />
                                    <ReactTooltip
                                        id="main"

                                        place={"top"}
                                        effect={"solid"}
                                        multiline={true}
                                    />
                                </Flip>
                            }
                        </div>
                        <div className={cx(css`
                            margin-bottom: ${theme.spacing.large}px; 
                            display: flex;
                            width: 100%;
                            flex-direction: column;
                            align-items: flex-end;
                        `)}>
                            <Flip right spy={showThumbnail}>
                                <Dropzone
                                    file={showThumbnail ? thumbnailFile : imageFile}
                                    onChange={(result: any) => showThumbnail ? onDropThumbnail(result) : onDropImage(result)}
                                    message={showThumbnail ? `Drag and drop to upload your public Thumbnail` : `Drag and drop to upload your awesome NFT`}
                                    note={`max file size is 200mb`}
                                    style={css`height: 326px;min-width: 539px;`}
                                />
                            </Flip>

                            <div className={cx(css`display: flex; align-items: center;margin-top: ${theme.spacing.medium}px;`)}>
                                <Toggle
                                    value={nft.protected}
                                    onChange={(e: any) => setNFT({ ...nft, protected: !nft.protected })}
                                />
                                <Text
                                    data-for="protect"
                                    data-tip={`If selected only minter / owner would be able to see the original media`}
                                    color={theme.color.black}
                                    weight={500} size={"normal"}
                                    style={cx(css`cursor: pointer; margin-left: ${theme.spacing.small}px; margin-top: 2px;`)}>
                                    Protect Original Image
                                </Text>
                                <ReactTooltip
                                    id="protect"
                                    place={"bottom"}
                                    effect={"solid"}
                                    multiline={true}
                                />
                            </div>

                        </div>
                        <Text weight={"400"} color={theme.color.black} size={"title"}>Accepts the following</Text>
                        <Text weight={"400"} lineHeight={"30px"} size={"normal"} color={theme.color.grey}>jpg, png, gif. Max size: 200MB (In the future: mp4, mp3, ogg, avi, webm)</Text>

                        <div className={cx(css`width: 100%; display: flex; margin-top: ${theme.spacing.medium}px; align-items: center;`)}>
                            <Text weight={"400"} color={theme.color.black} size={"title"}>Create as</Text>
                            <Button full={false} style={css`padding: 10px; min-width: auto; min-height: auto; cursor: auto; margin-left:${theme.spacing.small}px;`} onClick={() => { }}>SNIP721</Button>
                        </div>
                    </div>
                    <div className={cx(css`width: 100%; display: flex; flex-direction: column;margin-left:${theme.spacing.large}px;`)} >
                        <Input
                            placeholder={`Add a name`}
                            label={`Name *`}
                            value={nft.name}
                            onChange={(value: string) => setNFT({ ...nft, name: value })}
                            style={css`margin-bottom: ${theme.spacing.medium}px;`}
                        />
                        <Textarea
                            placeholder={`Tell us about your process`}
                            label={`Description`}
                            value={nft.description}
                            onChange={(value: string) => setNFT({ ...nft, description: value })}
                        />
                        <div className={cx(css`display: flex;margin-top:${theme.spacing.large}px;`)}>
                            <Text weight={400} color={theme.color.black} size={"label"}>Properties</Text>
                            <Text style={css`margin-left:${theme.spacing.small}px; `} weight={400} color={theme.color.grey} size={"label"}>(optional)</Text>
                        </div>

                        <div className={cx(css`
                            display: flex;
                            margin-top:${theme.spacing.small}px;
                             & > * {
                                 margin-right: ${theme.spacing.medium}px;
                             }
                        `)}>
                            {renderShield(publicIcon, "Public", "public_shield", `Public Property, everybody can see it's name and value`)}
                            {renderShield(protectIcon, "Protected", "protected_shield", `Protected Property, everybody can see the property name but not it's value`)}
                            {renderShield(privateIcon, "Private", "private_shield", `Private Property, name and value are completly hidden for outside users`)}
                        </div>
                        {renderProperties()}

                        <Button
                            style={css`padding: 10px; width: 100%; height: 50px; margin-top:${theme.spacing.large}px;`}
                            onClick={() => onCreateNFT()}
                            loading={result.loading}
                        >
                            {result.loading ? <div className={cx(css`display: flex; justify-content: center;`)}><Loader size={18} white={true} /></div> : `Create NFT`}
                        </Button>
                    </div>


                </div>

            </Jump>


            <Modal title={`NFT Created!`} isOpen={modal} onClose={() => setModal(false)}>
                <div className={cx(css`
                    display: flex; 
                    flex-direction: column; 
                    align-items: center;
                    width: 500px;
                `)}>

                    <BackgroundImage image={imageFile?.preview || plusIcon} />

                    <Text style={css`
                        margin-top: ${theme.spacing.large}px;
                        margin-bottom: ${theme.spacing.xsmall}px;
                    `} size={"label"} weight={400} color={theme.color.black}>
                        {nft.name}
                    </Text>
                    <Text size={"label"} weight={400} color={theme.color.grey}>
                        has been successfully created
                    </Text>
                    <div className={cx(css`width: 100%; display: flex; flex-direction: column; margin: ${theme.spacing.large}px 0;`)}>
                        <Text style={css`margin-bottom: ${theme.spacing.xsmall}px;`} size={"label"} color={theme.color.black}>Collection: <Text gradientOne={theme.color.orange} gradientTwo={theme.color.pink}>{collection.label}</Text>
                        </Text>
                        <Text size={"label"} color={theme.color.black}>Identification: <Text gradientOne={theme.color.orange} gradientTwo={theme.color.pink}>{result.token_id}</Text>
                        </Text>
                    </div>

                    <Button onClick={() => {
                        history.push(`/asset/${collection.value}/${result.token_id}`)
                    }} full={false}>View Asset</Button>
                </div>

            </Modal>
        </div>
    );
}
