export const UNLOCK_TOKEN = 'Unlock';
export const FIX_VIEWINGKEY = 'Fix';
export const LOADING = "loading"

export interface TOKEN {
    symbol: string,
    icon: string,
    name: string,
    address: string,
    decimals: number
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