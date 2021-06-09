import React from "react";
import cx from "classnames";
import { css } from "@emotion/css";
import { ThemeContext } from "../../contexts/ThemeContext";
import { CreateNotification } from "../../contexts/HeaderContext";
import { SecretContext } from "../../contexts/SecretContext";
import { LanguageContext } from "../../contexts/LanguageContext";
import Button from "../../components/button";
import Dropzone from "../../components/dropzone";
import Text from "../../components/text";
import Input from "../../components/input";
import Textarea from "../../components/textarea";
import Toggle from "../../components/toggle";
import Select from "../../components/select";
import { SIZE } from "../../components/text";
import { dictionary } from "../../dictionary"
import IPFS from "ipfs-api";
import Flip from 'react-reveal/Flip';
import ReactTooltip from "react-tooltip";

import uploadIcon from "../../images/icons/upload.svg";
import editIcon from "../../images/icons/edit.svg";
import shieldIcon from "../../images/icons/shield.svg";
import rotateIcon from "../../images/icons/rotate.svg";
import collectionIcon from "../../images/icons/collection.svg";

interface PROPERTY {
    label: string,
    value: string,
    private: boolean,
}

interface NFT {
    name: string,
    description: string,
    protected: boolean,
    imageHash: string,
    thumbnailHash: string,
    properties: PROPERTY[]
}

interface COLLECTION {
    name: string,
    symbol: string,
}

const defaultNFT: NFT = {
    name: "",
    protected: false,
    description: "",
    imageHash: "",
    thumbnailHash: "",
    properties: []
}

const defaultCollection: COLLECTION = {
    name: "",
    symbol: ""
}

const ipfs = new IPFS({
    host: "ipfs.infura.io",
    port: 5001,
    protocol: "https",
});

export default function MyTabs() {
    const [nft, setNFT] = React.useState<NFT>(defaultNFT);
    const [collection, setCollection] = React.useState<COLLECTION>(defaultCollection);
    const [showThumbnail, setShowThumbnail] = React.useState<boolean>(false);

    const [imageFile, setImageFile] = React.useState<{ preview: string }>();
    const [thumbnailFile, setThumbnailFile] = React.useState<{ preview: string }>();

    const [language] = React.useContext(LanguageContext);
    const [theme] = React.useContext(ThemeContext);
    const [, services] = React.useContext(SecretContext);

    const onDropImage = (uploaded: any) => {
        console.log('uploaded', uploaded)
        setImageFile(uploaded.file)
        return
        console.log('uploaded', uploaded)
        ipfs.add(uploaded.buffer, (err: any, result: any) => {
            if (!result[0] || err) {
                CreateNotification("Could not upload your image to ipfs", "Image Upload Error")
                return
            }
            CreateNotification("Image Uploaded to ipfs succefully", "Image Uploaded!")
            setNFT({ ...nft, imageHash: result[0].hash })
        });
    };

    const onDropThumbnail = (uploaded: any) => {
        setThumbnailFile(uploaded.file)
    };



    React.useEffect(() => {
        if (nft.protected) setShowThumbnail(true)
    }, [nft.protected]);




    const renderStep = (image: any, title: string, text: string) => {
        return <div className={cx(css`display: flex; width: 300px; margin-right: 30px;`)}>
            <img height={40} src={image} />
            <div className={cx(css`display: flex; flex-direction: column; margin-left: ${theme.spacing.small}px;`)}>
                <Text weight={"600"} size={SIZE.title} gradientOne={theme.color.orange} gradientTwo={theme.color.pink} style={css`margin-bottom: ${theme.spacing.small}px;`}>{title}</Text>
                <Text lineHeight={"20px"} color={theme.color.grey}>{text}</Text>
            </div>
        </div>
    }

    return (
        <div className={cx(css`
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          padding: 50px;
          max-width: 1200px;
          box-sizing: border-box;
        `)}
        >
            <span
                className={cx(css`
                height: 3px;
                width: 35px;
                margin-bottom: ${theme.spacing.medium}px;
                background: linear-gradient(
                  to right,
                  ${theme.color.orange},
                  ${theme.color.pink}
                );
              `)}
            ></span>
            <Text
                weight={"500"}
                gradientOne={theme.color.orange}
                gradientTwo={theme.color.pink}
                size={SIZE.section}
                style={css(`margin-bottom: 70px`)}
            >
                Create your first Secret NFTs
            </Text>

            <div className={cx(css`width: 100%; display: flex;`)}>
                <Text
                    weight={"500"}
                    color={theme.color.black}
                    size={SIZE.title}
                    style={css(`margin-bottom: 30px`)}
                >
                    NFT Minting Guidelines
                </Text>
            </div>

            <div className={cx(css`width: 100%; display: flex; justify-content: space-between;`)}>
                {renderStep(collectionIcon, dictionary.STEP0[language], dictionary.STEP0_TEXT[language])}
                {renderStep(uploadIcon, dictionary.STEP1[language], dictionary.STEP1_TEXT[language])}
                {renderStep(editIcon, dictionary.STEP2[language], dictionary.STEP2_TEXT[language])}
                {renderStep(shieldIcon, dictionary.STEP3[language], dictionary.STEP3_TEXT[language])}
            </div>

            <div className={cx(css`width: 100%; display: flex; justify-content: space-between; margin-top: 80px;`)}>
                <div className={cx(css`width: 100%; display: flex; flex-direction: column;`)} >
                    <Input
                        placeholder={`Add a name`}
                        label={`Collection Name *`}
                        value={collection.name}
                        onChange={(value: string) => setCollection({ ...collection, name: value })}
                        style={css`margin-bottom: ${theme.spacing.medium}px;`}
                        required
                    />
                    <Input
                        placeholder={`Add a symbol`}
                        label={`Collection Symbol *`}
                        value={collection.symbol}
                        onChange={(value: string) => setCollection({ ...collection, symbol: value })}
                        style={css`margin-bottom: ${theme.spacing.medium}px;`}
                        required
                    />

                    <Button
                        style={css`padding: 10px; width: 100%; height: 50px; margin-top:${theme.spacing.large}px;`}
                        onClick={() => {
                            if (!collection.name || !collection.symbol) return
                            services.createCollection(collection.name, collection.symbol)
                        }}>
                        Create Collection
                    </Button>
                </div>
                <div className={cx(css`border-left: 1px solid ${theme.color.greylight}; position: relative; margin: 0 ${theme.spacing.large}px;`)}>
                    <div className={cx(css`padding: 5px; background-color: ${theme.color.white}; position: absolute; top: calc(50% - 21px); left: -13px; `)}>
                        <Text size={SIZE.label} color={theme.color.orange}>
                            or
                        </Text>
                    </div>

                </div>
                <div className={cx(css`width: 100%; display: flex; flex-direction: column;`)} >
                    <Select label={`Select existing Collection *`} onChange={() => { }} options={[]} value={null} />
                </div>
            </div>


            <div className={cx(css`
                width: 100%; 
                display: flex; 
                justify-content: space-between; 
                margin-top: 80px;
                position: relative;
            `)}>
                <div className={cx(css`z-index: 3; width: 100%; height: 100%; position: absolute; background-color:${theme.color.white}aa;`)}></div>

                <div className={cx(css`width: 100%; display: flex; flex-direction: column;`)} >
                    <div className={cx(css`height: 31px;margin-bottom: ${theme.spacing.small}px; `)}>
                        {nft.protected &&
                            <Flip left>
                                <img
                                    src={rotateIcon}
                                    width={31}
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
                        <Flip bottom spy={showThumbnail}>
                            <Dropzone
                                file={showThumbnail ? thumbnailFile : imageFile}
                                onChange={(result: any) => !showThumbnail ? onDropImage(result) : onDropThumbnail(result)}
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
                                data-tip={`If selected only minter / owner would be able to see the original`}
                                color={theme.color.black}
                                weight={500} size={SIZE.normal}
                                style={cx(css`cursor: pointer; margin-left: ${theme.spacing.small}px; margin-top: 2px;`)}>
                                Protect Original
                            </Text>
                            <ReactTooltip
                                id="protect"
                                place={"bottom"}
                                effect={"solid"}
                                multiline={true}
                            />
                        </div>

                    </div>
                    <Text weight={"400"} color={theme.color.black} size={SIZE.title}>Accepts the following</Text>
                    <Text weight={"400"} lineHeight={"30px"} size={SIZE.normal} color={theme.color.grey}>jpg, mp4, png, ogg, avi, gif, mp3, webm. Max size: 200MB</Text>

                    <div className={cx(css`width: 100%; display: flex; margin-top: ${theme.spacing.medium}px; align-items: center;`)}>
                        <Text weight={"400"} color={theme.color.black} size={SIZE.title}>Create as</Text>
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
                    <Button style={css`padding: 10px; width: 100%; height: 50px; margin-top:${theme.spacing.large}px;`} onClick={() => { }}>
                        Create NFT
                    </Button>
                </div>


            </div>
        </div>
    );
}
