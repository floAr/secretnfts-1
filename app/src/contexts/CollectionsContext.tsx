import React from 'react';
import { WalletContext } from "./WalletContext";
import { SecretContext } from "./SecretContext";
import { COLLECTION, defaultNFT, GET_COLLECTIONS_PARAMS, NFT } from '../constants';
import { getCollections, getCollection, getLocalstorage } from '../client';

interface SERVICES {
    fetchCollections: Function
    fetchCollection: Function
    fetchCollectionNFTIdentifiers: Function
    fetchNFTs: Function
    fetchFullCollection: Function
}


type CollectionsState = {
    collections: Map<string, COLLECTION>; //collection address to collection
    users: Map<string, string[]>; //user address to collections address
    nfts: Map<string, NFT>; //contractaddress_tokenid to nft
};


type CollectionsParams = [CollectionsState, SERVICES];
const CollectionsContext = React.createContext<CollectionsParams>([{ collections: new Map(), users: new Map(), nfts: new Map() }, {
    fetchCollections: () => { },
    fetchCollection: () => { },
    fetchCollectionNFTIdentifiers: () => { },
    fetchNFTs: () => { },
    fetchFullCollection: () => { },
}]);

const CollectionsProvider = (props: any) => {
    const [state, setState] = React.useState<CollectionsState>({ collections: new Map(), users: new Map(), nfts: new Map() });
    const [wallet] = React.useContext(WalletContext);
    const [secretservices] = React.useContext(SecretContext);


    const services: SERVICES = {
        fetchCollectionNFTIdentifiers: (address: string, callback: Function) => {
            const vk = getLocalstorage(`${address}_key`)
            secretservices.getCollectionNFTIdentifiers(address, vk, (result: any) => {
                if (result.error) return callback({ error: true, message: result.error })
                const nfts = result.tokens.map((id: any) => ({ ...defaultNFT, id: id, loading: true }))
                const collection = setCollection(address, { nfts })
                callback({ error: false, collection })
            })
        },

        fetchCollections: (params: GET_COLLECTIONS_PARAMS, callback: Function) => {
            getCollections(params, (result: COLLECTION[]) => {
                const collections: COLLECTION[] = []
                result.forEach(coll => {
                    const tmpusers: Map<string, string[]> = state.users
                    tmpusers.set(coll.from, result.map(coll => coll.address))
                    setState({ ...state, users: tmpusers })
                    const collection = setCollection(coll.address, {
                        name: coll.name,
                        symbol: coll.symbol,
                        address: coll.address,
                        from: coll.from,
                    })

                    collections.push(collection)
                })
                callback(collections)
            })
        },

        fetchNFTs: (from: string, ids: string[], callback: Function) => {
            getCollectionNFTs(from, ids, (result: NFT[]) => {
                const collection = setCollection(from, { nfts: result })
                callback(collection)
            })

        },


        fetchFullCollection: (address: string, callback: Function) => {
            console.log('fetchFullCollection', address)
            services.fetchCollection(address, (result: any) => {
                if (result.error) return callback({ error: true, message: "not found" })
                const collection = result.collection
                services.fetchCollectionNFTIdentifiers(collection.address, (result: any) => {
                    if (result.error) return callback({ error: true, message: "not found" })
                    const ids = result.collection.nfts.map((nft: NFT) => nft.id)
                    services.fetchNFTs(address, ids, (collection: COLLECTION) => {
                        callback({ error: false, collection })
                    })
                })
            })
        },

        fetchCollection: (address: string, callback: Function) => {
            getCollection(address, async (coll: COLLECTION) => {
                if (!coll) return callback({ error: true, message: "not found" })
                const collection = setCollection(coll.address, {
                    name: coll.name,
                    symbol: coll.symbol,
                    address: coll.address,
                    from: coll.from,
                })
                callback({ error: false, collection })
            })
        },

    }

    const setCollection = (address: string, params: any) => {
        const tmpcollections: Map<string, COLLECTION> = state.collections

        const result: COLLECTION = {
            name: "",
            symbol: "",
            address: "",
            from: "",
            nfts: [],
            last_requested_by: wallet.address,
            ...tmpcollections.get(address),
            ...params
        }

        tmpcollections.set(address, result)
        setState({ ...state, collections: tmpcollections })

        return result
    }

    const fetchFullCollections = async (addresses: string[], callback: Function) => {
        const promises: Promise<any>[] = []
        const collections: COLLECTION[] = []

        addresses.forEach(address => {

            promises.push(new Promise(async (resolve, reject) => {
                services.fetchFullCollection(address, (result: any) => {
                    if (result.error) reject()
                    collections.push(result.collection)
                    resolve(result.collection)
                })
            }))

        })

        await Promise.all(promises);
        callback(collections)
    }

    const getCollectionNFTs = async (address: string, ids: string[], callback: Function) => {
        const vk = getLocalstorage(`${address}_key`)
        const promises: Promise<any>[] = []
        const nfts: NFT[] = []
        ids.forEach(id => {
            promises.push(new Promise(async (resolve, reject) => {
                const result = await secretservices.getNFT(id, address, vk)
                if (result.error) return reject()
                nfts.push(result.nft)
                resolve(result.nft)
            }))
        });

        await Promise.all(promises);
        callback(nfts)
    }



    return (
        <CollectionsContext.Provider value={[state, services]}>
            {props.children}
        </CollectionsContext.Provider>
    );
}

export { CollectionsContext, CollectionsProvider };

