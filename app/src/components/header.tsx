import React from 'react'; // we need this to make JSX compile
import cx from "classnames";
import { css } from '@emotion/css'
import { Link } from "react-router-dom";
import { HashLink } from 'react-router-hash-link';
import scrtIcon from "../images/icons/scrt.svg"
import Address from "./address"
import Logo from "./logo"
import Button from "./button"
import Text from "./text"
import { ThemeContext } from '../contexts/ThemeContext';
import Fade from 'react-reveal/Fade';

import { WalletContext } from "../contexts/WalletContext";

import profileIcon from '../images/other/dummy.png'
import keyIcon from '../images/icons/key.svg'
import listIcon from '../images/icons/collection.svg'

type LinkObject = { text: string, path: string }
type Props = { links: Array<LinkObject> }

export default function Header({
    links = []
}: Props) {


    const [wallet, connectWallet] = React.useContext(WalletContext)
    const [theme] = React.useContext(ThemeContext)
    const [profileOpen, setProfileOpen] = React.useState<boolean>(false);

    const renderWallet = () => {

        if (!wallet.address) return (
            <div className={cx(css`min-width: 160px; cursor: pointer;`)} onClick={async () => {
                connectWallet()
            }}>
                <Text size={"label"} gradientOne={theme.color.orange} gradientTwo={theme.color.pink}>Connect Keplr Wallet</Text>
            </div>
        )
        return (
            <div className={cx(css`display: flex; align-items: center; position: relative;`)}>
                <div className={cx(css`
                        border-radius: 20px; 
                        margin-right: ${theme.spacing.medium}px;
                        color:${theme.color.purple};
                        display: flex; 
                        align-items: center;
                        font-size: 13px;
                        padding: 9px;
                        border: 1px solid ;
                        border-radius: 5px;
                        border-image:linear-gradient(45deg,${theme.color.pink},${theme.color.orange}) 10;
                    `)}>
                    <div className={cx(css`display: flex; align-items: center;`)}>
                        <img className={cx(css`margin-right: 7px;`)} alt="wallet" src={scrtIcon} width={20} />
                        <Text color={theme.color.black} size="normal" ><Address address={wallet.address} /></Text>
                    </div>
                    <span className={cx(css`margin: 0 6px;`)}>|</span>
                    <div className={cx(css`display: flex; align-items: center;`)}>
                        <Text style={cx(css`margin-right: 6px;`)} size={"label"} weight={600} gradientOne={theme.color.pink} gradientTwo={theme.color.orange}>{wallet.balances.scrt.amount}</Text>
                        <span>SCRT</span>
                    </div>

                </div>
                <img src={profileIcon} width={35} className={cx(css`cursor: pointer;`)} onClick={() => setProfileOpen(!profileOpen)} />
                {profileOpen &&
                    <Fade right duration={400}>
                        <div className={cx(css`
                            top: 63px; 
                            right: 0;
                            display: flex; 
                            flex-direction: column; 
                            position: absolute;
                            -webkit-box-shadow: 0px 1px 5px 0px ${theme.color.black}; 
                            box-shadow: 0px 1px 5px 0px ${theme.color.black};
                            & > * {
                                padding: 15px;
                                background-color: ${theme.color.white};
                                display: flex;
                                align-items: center;
                                border-bottom: 1px solid ${theme.color.greylight};
                                transition: background-color .6s;

                                &:hover{
                                background-color: ${theme.color.greylight};

                                }

                                & > img {
                                    margin-right: ${theme.spacing.small}px;
                                }
                            }
                        `)}>
                            <HashLink to={`/inventory/${wallet.address}`} style={{ textDecoration: 'none' }} onClick={() => setProfileOpen(false)}>
                                <img width={15} src={listIcon} />
                                <Text color={theme.color.blacklight}>Inventory</Text>
                            </HashLink>

                            <HashLink to={"/profile"} style={{ textDecoration: 'none' }} onClick={() => setProfileOpen(false)}>
                                <img width={15} src={keyIcon} />
                                <Text color={theme.color.blacklight}>Profile</Text>
                            </HashLink>
                        </div>
                    </Fade >}
            </div>
        )
    }
    return <div className={cx(css`display: flex; flex-direction: column; `)}>
        <div className={cx(css`
            display: flex; 
            flex-direction: row; 
            align-items: center; 
            justify-content: space-between;
            color: ${theme.color.black};
            background-color: ${theme.color.white}dd;
            backdrop-filter: blur(5px);
            height: 70px;
            padding: 12px 100px;
            box-sizing: border-box;
            -webkit-box-shadow: 0px 2px 10px -1px ${theme.color.black}; 
            box-shadow: 0px 2px 10px -1px ${theme.color.black};
        `)}>


            <Link to="/" className={cx(css`text-decoration:none; color:inherit; margin-right: ${theme.spacing.large}px;`)}>
                <Logo width={40} />
            </Link>
            <div className={cx(css` font-size: 16px; display: flex; flex-direction: row; letter-spacing: 1px; align-items: center;`)} >
                {links.map((link, index) =>
                    <HashLink
                        key={index}
                        to={link.path}
                        smooth
                        className={cx(css`
                            margin-right:${theme.spacing.large}px; 
                            cursor: pointer;
                            text-decoration: none; 
                        `)}>
                        <Text size={"label"} spacing={"0.04em"} color={theme.color.black}>{link.text}</Text>
                    </HashLink>)}
            </div>

            {wallet.isKeplrCli ? <div className={cx(css`display: flex; flex-direction: row; align-items: center;`)}>
                {renderWallet()}
            </div> : <div
                className={cx(css`cursor: pointer;`)}
                onClick={() => window.open("https://chrome.google.com/webstore/detail/keplr/dmkamcknogkgcdfhhbddcghachkejeap", '_blank')}
            >
                <Text size={"label"} gradientOne={theme.color.orange} gradientTwo={theme.color.pink}>Install Keplr Wallet</Text>
            </div>}
        </div>
    </div>

}

