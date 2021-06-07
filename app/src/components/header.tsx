import React from 'react'; // we need this to make JSX compile
import cx from "classnames";
import { css } from '@emotion/css'
import { Link } from "react-router-dom";
import keplrIcon from "../images/icons/keplr.svg"
import scrtIcon from "../images/icons/scrt.svg"
import Address from "./address"
import Logo from "./logo"
import Button from "./button"
import Text, { SIZE } from "./text"
import { ThemeContext } from '../contexts/ThemeContext';

import { HeaderContext } from "../contexts/HeaderContext";
import { WalletContext, WalletFetcher } from "../contexts/WalletContext";

type LinkObject = { text: string, path: string }
type Props = { links: Array<LinkObject> }

export default function Header({
    links = []
}: Props) {


    const [header, setHeader] = React.useContext(HeaderContext)
    const [wallet, setWallet] = React.useContext(WalletContext)
    const [theme] = React.useContext(ThemeContext)

    return <div className={cx(css`display: flex; flex-direction: column; `)}>
        <div className={cx(css`
            display: flex; 
            flex-direction: row; 
            align-items: center; 
            justify-content: space-between;
            color: ${theme.color.black};
            background-color: ${theme.color.white}b5;
            backdrop-filter: blur(5px);
            height: 100px;
            padding: 12px 100px;
            box-sizing: border-box;
            -webkit-box-shadow: 0px 2px 10px -1px #111111; 
            box-shadow: 0px 2px 10px -1px #111111;
        `)}>


            <Link to="/" className={cx(css`text-decoration:none; color:inherit; margin-right: ${theme.spacing.large}px;`)}>
                <Logo width={60} />
            </Link>
            <div className={cx(css` font-size: 16px; display: flex; flex-direction: row; letter-spacing: 1px; align-items: center;`)} >
                {links.map(link =>
                    <Link
                        key={link.path}
                        to={link.path}
                        className={cx(css`
                            margin-right:${theme.spacing.large}px; 
                            cursor: pointer;
                            text-decoration: none; 
                            font-size: 20px;
                            line-height: 22px;
                            color: ${theme.color.black};
                        `)}>
                        <Text size={SIZE.title} spacing={"0.04em"} color={theme.color.black}>{link.text}</Text>
                    </Link>)}
            </div>

            <div className={cx(css`display: flex; flex-direction: row; align-items: center;`)}>
                {!wallet.address ?
                    <Button full={false} onClick={async () => {
                        const { secretjs, address, balances } = await WalletFetcher(wallet.keplrCli)
                        setWallet({ ...wallet, secretjs, loadingWallet: false, connected: true, address, balances })
                    }}>Connect</Button>
                    :
                    <div className={cx(css`
                        border-radius: 20px; 
                        margin-left: ${theme.spacing.medium}px;
                        color:${theme.color.purple};
                        display: flex; 
                        align-items: center;
                        font-size: 13px;
                        padding: 3px 9px;
                        border: 1px solid ${theme.color.blue};
                    `)}>
                        <div className={cx(css`display: flex;`)}>
                            <img className={cx(css`margin-right: 7px;`)} alt="wallet" src={scrtIcon} width={15} />
                            <Address address={wallet.address} />
                        </div>
                        <span className={cx(css`margin: 0 6px;`)}>|</span>
                        <div><b>{wallet.balances.scrt.amount}</b> SCRT</div>
                    </div>}
            </div>
        </div>
    </div>

}

