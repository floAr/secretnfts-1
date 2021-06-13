export const UNLOCK_TOKEN = 'Unlock';
export const FIX_VIEWINGKEY = 'Fix';
export const LOADING = "loading"
export const WITH_VIEWINGKEY = "with_viewingkey"

export enum PROPERTY_TYPE {
    PUBLIC = "public",
    PROTECTED = "protected",
    PRIVATE = "private",
}
export interface PROPERTY {
    label: string,
    value: string,
    type: PROPERTY_TYPE
}
export interface NFT {
    id: string,
    name: string,
    description?: string,
    collection: string,
    owner: string,
    minter: string,
    image: string,
    thumbnail?: string,
    private_properties: any,
    protected_properties: string[],
    private_metadata: string,
    public_metadata: string,
    public_properties: any,
    loading: boolean
}
export interface COLLECTION {
    name: string,
    symbol: string,
    address: string,
    from: string,
    nfts: NFT[],
    last_requested_by: string
}
export interface SELECT_OPTION {
    label: string,
    value: string,
}
export interface TOKEN {
    symbol: string,
    icon: string,
    name: string,
    address: string,
    decimals: number
}

export interface GET_COLLECTIONS_PARAMS {
    from?: string,
    limit?: number,
    ascending?: boolean,
}

export const tokens: TOKEN[] = [
    {
        symbol: "scrt",
        name: "Secret",
        icon: "https://assets.coingecko.com/coins/images/11871/small/Secret.png",
        address: "",
        decimals: 18
    },
    {
        symbol: "sefi",
        name: "Sefi",
        icon: "https://assets.coingecko.com/coins/images/14601/small/Secret-Swap-Icon.jpg",
        address: "secret12q2c5s5we5zn9pq43l0rlsygtql6646my0sqfm",
        decimals: 6
    },
    {
        symbol: "sEth",
        name: "sETH",
        icon: "https://assets.coingecko.com/coins/images/279/small/ethereum.png",
        address: "secret1ttg5cn3mv5n9qv8r53stt6cjx8qft8ut9d66ed",
        decimals: 18
    },
    {
        symbol: "sienna",
        name: "Sienna",
        icon: "https://assets.coingecko.com/coins/images/15196/small/608f130b2f3aa2c29957c608_sienna-200x200.png",
        address: "secret1s7c6xp9wltthk5r6mmavql4xld5me3g37guhsx",
        decimals: 18
    },

]

export const defaultNFT: NFT = {
    name: "",
    collection: "",
    id: "",
    image: "",
    minter: "",
    owner: "",
    private_metadata: "",
    public_metadata: "",
    description: "",
    private_properties: {},
    protected_properties: [],
    public_properties: {},
    loading: false
}

export const defaultCollection: COLLECTION = {
    address: "",
    name: "",
    symbol: "",
    from: "",
    nfts: [],
    last_requested_by: ""
}

export const customFees = {
    init: {
        amount: [{ amount: '300000', denom: 'uscrt' }],
        gas: '300000',
    },
    exec: {
        amount: [{ amount: '500000', denom: 'uscrt' }],
        gas: '500000',
    },
}