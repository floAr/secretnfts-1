import React from 'react';
import cx from "classnames";
import { css } from '@emotion/css'
import background from "../images/other/background.svg"
import { WalletContext } from '../contexts/WalletContext';
import { ThemeContext } from '../contexts/ThemeContext';
import Button from "../components/button"
import Text from "../components/text"
import { SIZE } from "../components/text"
import Icon from "../components/icon";

import twitterIcon from "../images/icons/twitter.svg"
import githubIcon from "../images/icons/github.svg"

export default function Invest() {
    const [wallet] = React.useContext(WalletContext)
    const [theme] = React.useContext(ThemeContext)

    React.useEffect(() => {

    }, []);

    return <div className={cx(css`color: ${theme.color.white};`)}>
        <div className={cx(css`
            -webkit-background-size: cover;
            -moz-background-size: cover;
            -o-background-size: cover;
            background-size: cover;
            background-image: url(${background});
            width: 100%;
            height: 80vh;
            display: flex;
            align-items: center;
            justify-content: center;
        `)}>
            <div className={cx(css`
                background-size: 100% 100vh;
                display: flex;
                flex-direction: column;
                align-items: center;
                color: ${theme.color.white};
            `)}>
                <span className={cx(css`
                    font-weight: 600;
                    font-size: 96px;
                    line-height: 106px;
                    letter-spacing: 0.04em;
                    color: ${theme.color.white};
                    margin-bottom: 100px;
                `)}>Lorem Ipsum</span>
                <Button onClick={async () => { }}><Text weight={"bold"} size={SIZE.title}>Create Your Secret NFTs</Text></Button>

                <div className={cx(css`
                    display: flex;
                    flex-direction: column;
                `)}>
                    <Text size={SIZE.title} style={cx(css`margin-top: 100px;`)}>Goes Live Early August</Text>
                    <div className={cx(css`
                        display: flex;
                        margin-top: 20px;
                        justify-content: center;
                        & > * {
                            margin: 0 10px;
                        }
                    `)}>
                        <Icon color={theme.color.orange} icon={twitterIcon} href="https://github.com/chainofsecrets" blank />
                        <Icon color={theme.color.orange} icon={githubIcon} href="https://github.com/chainofsecrets" blank />
                    </div>
                </div>

            </div>

        </div>


        <div className={cx(css`
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 100px 0;
        `)}>
            <Text weight={"500"} gradientOne={theme.color.orange} gradientTwo={theme.color.pink} size={SIZE.section}>Why Privacy Matters for NFTs?</Text>
        </div>
    </div>

}

