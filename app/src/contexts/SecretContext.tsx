import React from 'react';
import { WalletContext } from "./WalletContext";

interface SERVICES {
    [name: string]: Function
}

interface NFT {
    name?: string,
    description?: string,
    image_ipfs?: string,
    attributes?: string[]
}

type SecretState = {
    nfts: NFT[];
};

type SecretParams = [SecretState, SERVICES];
const SecretContext = React.createContext<SecretParams>([{ nfts: [] }, {}]);


const SecretProvider = (props: any) => {
    const [state, setState] = React.useState<SecretState>({ nfts: [] });
    const [wallet] = React.useContext(WalletContext)

    const services: SERVICES = {
        createNFT: () => {

        }
    }

    return (
        <SecretContext.Provider value={[state, services]}>
            {props.children}
        </SecretContext.Provider>
    );
}

export { SecretContext, SecretProvider };