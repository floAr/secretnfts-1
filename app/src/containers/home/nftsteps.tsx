import React from "react";
import cx from "classnames";
import { css } from "@emotion/css";
import { ThemeContext } from "../../contexts/ThemeContext";
import { LanguageContext } from "../../contexts/LanguageContext";
import Text from "../../components/text";
import { SIZE } from "../../components/text";
import { dictionary } from "../../dictionary"

import uploadIcon from "../../images/icons/upload.svg";
import editIcon from "../../images/icons/edit.svg";
import shieldIcon from "../../images/icons/shield.svg";
import collectionIcon from "../../images/icons/collection.svg";



export default function NFTSteps() {

    const [language] = React.useContext(LanguageContext);
    const [theme] = React.useContext(ThemeContext);

    const renderStep = (image: any, title: string, text: string) => {
        return <div className={cx(css`display: flex; width: 300px; margin-right: 30px;`)}>
            <img height={40} src={image} />
            <div className={cx(css`display: flex; flex-direction: column; margin-left: ${theme.spacing.small}px;`)}>
                <Text weight={"600"} size={"title"} gradientOne={theme.color.orange} gradientTwo={theme.color.pink} style={css`margin-bottom: ${theme.spacing.small}px;`}>{title}</Text>
                <Text lineHeight={"20px"} color={theme.color.grey}>{text}</Text>
            </div>
        </div>
    }

    return (
        <div id="create" className={cx(css`
          display: flex;
          flex-direction: column;
          align-items: center;
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
                size={"section"}
                style={css(`margin-bottom: 70px`)}
            >
                Create your first Secret NFTs
            </Text>

            <div className={cx(css`width: 100%; display: flex;`)}>
                <Text
                    weight={"500"}
                    color={theme.color.black}
                    size={"title"}
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


        </div>
    );
}
