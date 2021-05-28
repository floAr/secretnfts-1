import { Response } from './interfaces'
import { divDecimals } from "./utils"

export const unlockToken = 'Unlock';

export const getViewingKey = async (params: {
    secretjs: any;
    chainId: string;
    address: string;
}): Promise<Response> => {
    let { secretjs, chainId, address } = params;


    let viewingKey: string = "";

    try {
        viewingKey = await secretjs.getSecret20ViewingKey(chainId, address);
    } catch (error) { }

    const response: Response = { values: { viewingKey }, error: false };
    return response
};

export const Snip20GetBalance = async (params: {
    secretjs: any;
    token: string;
    address: string;
    key: string;
}): Promise<Response> => {
    const { secretjs, address, token, key } = params;
    const response: Response = { error: false };

    let balanceResponse;
    try {
        balanceResponse = await secretjs.queryContractSmart(token, {
            balance: {
                address: address,
                key,
            },
        });
    } catch (e) {
        console.log(e);
    }

    if (!balanceResponse || balanceResponse.viewing_key_error) {
        response.error = true
        response.message = unlockToken
        return response;
    }

    response.values = { amount: balanceResponse.balance.amount }
    return response;
};

export const getSnip20Balance = async (params: {
    secretjs: any;
    chainId: string;
    address: string;
    tokenAddress: string;
    decimals?: string | number
}): Promise<Response> => {
    let { secretjs, chainId, address, tokenAddress, decimals } = params;
    const response: Response = { error: false };
    const vkResponse = await getViewingKey({ secretjs, chainId, address: tokenAddress });

    if (vkResponse.error) {
        response.error = true
        response.message = unlockToken
        return response;
    }

    const balanceResponse = await Snip20GetBalance({
        secretjs,
        token: tokenAddress,
        address,
        key: vkResponse.values.viewingKey,
    });

    if (balanceResponse.error) {
        response.error = true
        response.message = "fix"
        return response;
    }

    response.values = { balance: balanceResponse.values.amount }
    if (decimals) {
        const decimalsNum = Number(decimals);
        response.values = { balance: divDecimals(balanceResponse.values.amount, decimalsNum) }
    }

    return response;
};

const createCard = async (params: {
    secretjs: any,
    name?: String,
    description?: String,
    imageHash?: String,
    soundHash?: String
}): Promise<Response> => {

    let execMsg = {
        name: params.name,
        description: params.description,
        ipfs_image_cid: params.imageHash,
        ipfs_sound_cid: params.soundHash,
    }

    const tx = await params.secretjs.execute(
        process.env.REACT_APP_SECRET_CONTRACT, {
        create_card: execMsg,
    }, "", [
        {
            amount: `2000000`,
            denom: "uscrt",
        },
    ]
    )

    const response: Response = { error: false };

    if (tx.data && tx.data[0]) {
        response.values = { card_id: tx.data[0] }
    } else {
        throw new Error('Failed to get tx_id');
    }

    return response;
}

const queryCardCount = async (params: {
    secretjs: any,
}): Promise<Response> => {
    const response: Response = { error: false };
    let result = null
    try {
        result = await params.secretjs.queryContractSmart(process.env.REACT_APP_SECRET_CONTRACT, {
            get_card_count: {},
        });

        console.log('result queryCardCount', result)
    } catch (e) {
        console.log(e)
        response.error = true
        response.message = e.message
        throw new Error('Failed to get tx_id');
    }

    response.values = result
    return response;
}

const queryCard = async (params: {
    secretjs: any,
    id: number,
}): Promise<Response> => {
    const response: Response = { error: false };
    let result = null
    try {
        result = await params.secretjs.queryContractSmart(process.env.REACT_APP_SECRET_CONTRACT, {
            get_card_by_id: { card_id: 2 },
        });

        console.log('result queryCard', result)
    } catch (e) {
        console.log(e)
        response.error = true
        response.message = e.message
        throw new Error('Failed to get tx_id');
    }

    response.values = result
    return response;
}

export {
    createCard,
    queryCard,
    queryCardCount
};
