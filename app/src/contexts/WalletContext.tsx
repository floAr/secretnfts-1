import { resolve } from 'url'

import React from 'react'
import { SigningCosmWasmClient } from 'secretjs'

import {
  FIX_VIEWINGKEY,
  LOADING,
  UNLOCK_TOKEN,
  WITH_VIEWINGKEY,
  customFees,
  tokens,
} from '../constants'
import { Response } from '../interfaces'
import { divDecimals, formatWithSixDecimals } from '../utils'

require('dotenv').config()

type Balance = {
  amount: string
  rawAmount: number
}

interface Balances {
  [symbol: string]: Balance
}

type WalletState = {
  address: string
  balances: Balances
  price: number
  connected: boolean
  loadingWallet: boolean
  keplrCli?: any
  secretjs?: any
  loadingCli: boolean
  isKeplrCli: boolean
}

const defaultBalances: Balances = {}
tokens.forEach((token) => {
  defaultBalances[token.symbol] = { rawAmount: 0, amount: LOADING }
})

const defaultState = {
  address: '',
  balances: defaultBalances,
  price: 1,
  connected: false,
  loadingWallet: true,
  loadingCli: true,
  isKeplrCli: true,
  keplrCli: null,
  secretjs: null,
}

type WalletParams = [WalletState, Function]
const WalletContext = React.createContext<WalletParams>([
  defaultState,
  () => null,
])

export const getSCRTBalance = async (
  secretjs: any,
  keplrCli: any,
  address: string
) => {
  if (!secretjs || !keplrCli) return undefined
  const account = await secretjs.getAccount(address)
  return account
}

export const getSnip20Balance = async (params: {
  keplr: any
  secretjs: any
  chainId: string
  address: string
  tokenAddress: string
  decimals?: string | number
}): Promise<Response> => {
  let { keplr, secretjs, chainId, address, tokenAddress, decimals } = params
  const response: Response = { error: false }

  try {
    const viewingKey = await keplr.getSecret20ViewingKey(chainId, tokenAddress)
    const balanceResponse = await secretjs.queryContractSmart(tokenAddress, {
      balance: {
        address,
        key: viewingKey,
      },
    })

    if (balanceResponse.error) {
      response.error = true
      response.message = FIX_VIEWINGKEY
      return response
    }

    response.values = { balance: balanceResponse.balance.amount }

    if (decimals) {
      const decimalsNum = Number(decimals)
      response.values = {
        balance: divDecimals(balanceResponse.balance.amount, decimalsNum),
      }
    }
  } catch (error) {
    response.error = true
    response.message = UNLOCK_TOKEN
    return response
  }

  return response
}

export const checkCollectionViewingKey = async (params: {
  keplr: any
  chainId: string
  tokenAddress: string
}): Promise<Response> => {
  let { keplr, chainId, tokenAddress } = params
  const response: Response = { error: false }

  try {
    const viewingKey = await keplr.getSecret20ViewingKey(chainId, tokenAddress)
    response.error = false
    response.message = WITH_VIEWINGKEY
    return response
  } catch (error) {
    response.error = true
    response.message = UNLOCK_TOKEN
    return response
  }
}

const WalletProvider = (props: any) => {
  const [state, setState] = React.useState<WalletState>(defaultState)

  React.useEffect(() => {
    if (!state.keplrCli) return
    connectWallet()
  }, [state.keplrCli])

  React.useEffect(() => {
    const keplrCheckInterval = setInterval(async () => {
      setState({ ...state, loadingCli: true })
      const isKeplrCli =
        // @ts-ignore
        !!window.keplr && !!window.getOfflineSigner && !!window.getEnigmaUtils
      if (isKeplrCli) {
        // @ts-ignore
        setState({ ...state, keplrCli: window.keplr })
        clearInterval(keplrCheckInterval)
      } else {
        setState({
          ...state,
          loadingCli: false,
          isKeplrCli,
          loadingWallet: false,
        })
        clearInterval(keplrCheckInterval)
      }
    }, 1000)
  }, [])

  const WalletFetcherPromise = (keplrCli: any) =>
    new Promise(async (resolve, reject) => {
      // Setup Secret Testnet (not needed on mainnet)

      if (process.env.REACT_APP_ENV !== 'MAINNET') {
        await keplrCli.experimentalSuggestChain({
          chainId: process.env.REACT_APP_CHAIN_ID,
          chainName: process.env.REACT_APP_CHAIN_ID,
          rpc: process.env.REACT_APP_SECRET_RPC,
          rest: process.env.REACT_APP_SECRET_REST,
          bip44: {
            coinType: 529,
          },
          coinType: 529,
          stakeCurrency: {
            coinDenom: 'SCRT',
            coinMinimalDenom: 'uscrt',
            coinDecimals: 6,
          },
          bech32Config: {
            bech32PrefixAccAddr: 'secret',
            bech32PrefixAccPub: 'secretpub',
            bech32PrefixValAddr: 'secretvaloper',
            bech32PrefixValPub: 'secretvaloperpub',
            bech32PrefixConsAddr: 'secretvalcons',
            bech32PrefixConsPub: 'secretvalconspub',
          },
          currencies: [
            {
              coinDenom: 'SCRT',
              coinMinimalDenom: 'uscrt',
              coinDecimals: 6,
            },
          ],
          feeCurrencies: [
            {
              coinDenom: 'SCRT',
              coinMinimalDenom: 'uscrt',
              coinDecimals: 6,
            },
          ],
          gasPriceStep: {
            low: 0.1,
            average: 0.25,
            high: 0.4,
          },
          features: ['secretwasm'],
        })
      }

      try {
        const timeout = setTimeout(() => {
          setState({ ...state, loadingWallet: false })
          clearInterval(timeout)
        }, 2000)

        await keplrCli.enable(process.env.REACT_APP_CHAIN_ID)
        clearInterval(timeout)

        // @ts-ignore
        const keplrOfflineSigner = window.getOfflineSigner(
          process.env.REACT_APP_CHAIN_ID
        )
        const accounts = await keplrOfflineSigner.getAccounts()

        const address = accounts[0].address

        const secretjs = new SigningCosmWasmClient(
          process.env.REACT_APP_SECRET_REST || '',
          address,
          keplrOfflineSigner,
          // @ts-ignore
          window.getEnigmaUtils(process.env.REACT_APP_CHAIN_ID),
          customFees
        )

        const balances: Balances = defaultBalances

        tokens.forEach(async (token) => {
          if (token.symbol === 'scrt') {
            const scrtrawbalance = await getSCRTBalance(
              secretjs,
              keplrCli,
              address
            )
            const scrtbalance = formatWithSixDecimals(
              divDecimals(scrtrawbalance.balance[0].amount, 6)
            )
            balances['scrt'] = {
              rawAmount: Number(scrtrawbalance.balance[0].amount),
              amount: scrtbalance,
            }
            return
          }

          const result = await getSnip20Balance({
            keplr: keplrCli,
            secretjs,
            chainId: process.env.REACT_APP_CHAIN_ID || '',
            address,
            tokenAddress: token.address,
            decimals: token.decimals,
          })

          if (result.error) {
            balances[token.symbol].rawAmount = 0
            balances[token.symbol].amount = result.message || ''
            return
          }

          balances[token.symbol].rawAmount = Number(result.values.balance)
          balances[token.symbol].amount = formatWithSixDecimals(
            result.values.balance
          )
          resolve({ secretjs, address, balances })

        })
      } catch (error) {
        reject()
      }
    })

  const connectWallet = async () => {
    if (!state.keplrCli) return

    setState({ ...state, loadingCli: false, loadingWallet: true })
    WalletFetcherPromise(state.keplrCli)
      .then((result: any) => {
        if (!result) return
        setState({
          ...state,
          loadingWallet: false,
          connected: true,
          secretjs: result.secretjs,
          address: result.address,
          balances: result.balances,
        })
      })
      .catch((error) => {
        setState({ ...state, loadingWallet: false, connected: true })
      })
  }

  return (
    <WalletContext.Provider value={[state, connectWallet]}>
      {props.children}
    </WalletContext.Provider>
  )
}

export { WalletContext, WalletProvider }
