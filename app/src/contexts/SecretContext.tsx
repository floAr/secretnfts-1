import React from 'react';
import { customFees, NFT } from '../constants';
import { WalletContext } from "./WalletContext";
import { SigningCosmWasmClient, Secp256k1Pen, encodeSecp256k1Pubkey, pubkeyToAddress, EnigmaUtils } from 'secretjs';

interface SERVICES {
    createCollection: Function,
    createNFT: Function,
    setCollectionViewingKey: Function
    getNFT: Function
    getCollectionNFTIdentifiers: Function
}

const defaultServices: SERVICES = {
    createCollection: () => { },
    createNFT: () => { },
    setCollectionViewingKey: () => { },
    getNFT: () => { },
    getCollectionNFTIdentifiers: () => { },
}

const getOfflineSecretJS = async () => {
    const signingPen = await Secp256k1Pen.fromMnemonic(process.env.REACT_APP_SECRET_REQUESTS_DEFAULT_MNEMONIC || "").catch((err) => {
        throw new Error(`Could not get signing pen: ${err}`);
    });
    const pubkey = encodeSecp256k1Pubkey(signingPen.pubkey);
    const accAddress = pubkeyToAddress(pubkey, "secret");
    const txEncryptionSeed = EnigmaUtils.GenerateNewSeed();

    const secretjs = new SigningCosmWasmClient(
        process.env.REACT_APP_SECRET_REST || '',
        accAddress,
        (signBytes) => signingPen.sign(signBytes),
        txEncryptionSeed,
        customFees,
    );

    return secretjs
}

type SecretParams = [SERVICES];
const SecretContext = React.createContext<SecretParams>([defaultServices]);

const SecretProvider = (props: any) => {
    const [wallet] = React.useContext(WalletContext)
    const secretjs = React.useRef<any>()

    React.useEffect(() => {
        if (wallet.secretjs) {
            secretjs.current = wallet.secretjs
            return
        }

        const createSecretJs = async () => {
            secretjs.current = await getOfflineSecretJS()
        }
        secretjs.current = createSecretJs()
    }, [wallet.secretjs]);

    const services: SERVICES = {
        createCollection: async (name: string, symbol: string, callback: Function) => {
            if (!wallet.address) return callback({ error: true, message: "Missing Wallet" })
            const initMsg = {
                name,
                symbol,
                entropy: "23asdaweaawdawda2341q2d",
                config: {
                    public_token_supply: true,
                    public_owner: true,
                    enable_sealed_metadata: false,
                    unwrapped_metadata_is_private: false,
                    minter_may_update_metadata: true,
                    owner_may_update_metadata: true,
                    enable_burn: false
                },
            }

            try {
                const contract = await secretjs.current.instantiate(
                    29397,
                    initMsg,
                    `Secret NFTS ${name} - ${symbol}`
                ).catch((err: any) => {
                    console.log('err', err)
                    callback({ error: true, message: err })
                    return
                });

                callback({ error: false, response: contract })
            } catch (error) {
                callback({ error: true, message: error })

            }

        },

        getNFT: async (token_id: string, address: string, viewingkey: string): Promise<any> => {

            const query = async (viewer?: any) => {
                const nft_dossier: any = { token_id }
                if (viewer) nft_dossier["viewer"] = viewer

                const result = await secretjs.current.queryContractSmart(
                    address,
                    {
                        nft_dossier
                    },
                    "", []
                );

                return result
            }

            const saltNFT = (original: any) => {
                //const tmp = result.nft_dossier
                const public_metadata = JSON.parse(original.public_metadata.description)
                const private_metadata = original.private_metadata ? JSON.parse(original.private_metadata.description) : {}
                const public_properties = { ...public_metadata }
                delete public_properties.description
                delete public_properties.protected_properties
                delete public_properties.thumbnail


                // if (typeof private_metadata === "object")
                //     private_metadata = Object.keys(private_metadata).map((key) => ({ [key]: private_metadata[key] }));

                const nft: NFT = {
                    id: token_id,
                    name: original.public_metadata.name,
                    description: public_metadata.description,
                    collection: address,
                    owner: original.owner,
                    minter: original.owner,
                    image: original.public_metadata.image || (original.private_metadata ? original.private_metadata.image : ""),
                    thumbnail: public_metadata.thumbnail || "",
                    private_metadata: original.private_metadata,
                    public_metadata: original.public_metadata,
                    private_properties: private_metadata,
                    protected_properties: public_metadata.protected_properties || [],
                    public_properties: public_properties,
                    loading: false
                }

                return nft
            }


            try {
                const result = await query({
                    address: wallet.address,
                    viewing_key: viewingkey
                })
                return { error: false, nft: saltNFT(result.nft_dossier) }

            } catch (error) {
                try {
                    const result = await query()
                    return { error: false, nft: saltNFT(result.nft_dossier) }
                } catch (error2) {
                    return { error: true, message: error }
                }
            }

        },

        getCollectionNFTIdentifiers: async (address: string, viewingkey: string, callback: Function) => {

            try {
                const result = await secretjs.current.queryContractSmart(
                    address,
                    {
                        all_tokens: {
                            viewer: wallet.address && viewingkey ? {
                                address: wallet.address,
                                viewing_key: viewingkey
                            } : null
                        }
                    },
                    "", []
                );

                const alltokens = result.token_list.tokens
                callback({ error: false, tokens: alltokens })

            } catch (error) {
                console.log('error', error)
                callback({ error: true, message: error })
            }


        },


        setCollectionViewingKey: async (address: string, callback: Function) => {
            const now = new Date().getTime()
            const entropy = `${address}${now}`

            // try {
            //     await wallet.keplrCli.suggestToken(process.env.REACT_APP_CHAIN_ID, address);
            //     callback(true);
            // } catch (error) {
            //     console.log(error);
            //     callback(false);
            // }


            try {
                const result = await secretjs.current.execute(
                    address,
                    {
                        create_viewing_key: {
                            entropy: entropy,
                        }
                    },
                    "", []
                );
                const decoded = new TextDecoder().decode(result.data)
                callback(JSON.parse(decoded))
            } catch (error) {
                callback({ error: true, message: error })
            }


        },
        createNFT: async (nft: any, address: string, callback: Function) => {
            if (!wallet.address) return callback({ error: true, message: "Missing Wallet" })

            try {
                const result = await secretjs.current.execute(
                    address,
                    { mint_nft: nft },
                    "", []
                );
                const decoded = JSON.parse(new TextDecoder().decode(result.data))
                callback({ error: false, token_id: decoded.mint_nft.token_id })
            } catch (error) {
                callback({ error: true, message: error })
            }
        }
    }

    return (
        <SecretContext.Provider value={[services]}>
            {props.children}
        </SecretContext.Provider>
    );
}

export { SecretContext, SecretProvider };