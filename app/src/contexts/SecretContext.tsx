import React from 'react';
import { WalletContext } from "./WalletContext";

interface SERVICES {
    createCollection: Function,
    createNFT: Function,
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
const SecretContext = React.createContext<SecretParams>([{ nfts: [] }, { createCollection: () => { }, createNFT: () => { } }]);


const SecretProvider = (props: any) => {
    const [state, setState] = React.useState<SecretState>({ nfts: [] });
    const [wallet] = React.useContext(WalletContext)

    const services: SERVICES = {
        createCollection: async (name: string, symbol: string) => {
            const initMsg = {
                name,
                symbol,
                entropy: "23asdaweaawdawda2341q2d",
                config: {
                    public_token_supply: false,
                    public_owner: false,
                    enable_sealed_metadata: false,
                    unwrapped_metadata_is_private: false,
                    minter_may_update_metadata: true,
                    owner_may_update_metadata: true,
                    enable_burn: false
                },
            }

            const contract = await wallet.secretjs.instantiate(
                29397,
                initMsg,
                `Secret NFTS ${name} - ${symbol}`
            ).catch((err: any) => {
                console.log('err', err)
            });

            console.log(contract)
        },

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