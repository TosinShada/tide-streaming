import { useEffect, useState } from 'react'
import {
  Contract as tokenContract,
  networks as tokenNetwork
} from 'mock-client'
import {
  Contract as streamContract,
  networks as streamNetwork,
  Stream
} from 'streamdapp-client'
import freighter from '@stellar/freighter-api'
import { useAccount } from './useAccount'

const defaultState = [] as Stream[];
export function useGetStream() {
  const [updatedAt, setUpdatedAt] = useState(Date.now())
  const [token, setToken] = useState<{
    balance: BigInt
    decimals: number
    name: string
    symbol: string
  }>()
  const [userStreams, setUserStreams] = useState<Stream[]>(defaultState)
  const account = useAccount()

  useEffect(() => {
    const tokenClient = new tokenContract({
      contractId: tokenNetwork.testnet.contractId,
      networkPassphrase: tokenNetwork.testnet.networkPassphrase,
      rpcUrl: 'https://soroban-testnet.stellar.org',
      wallet: freighter,
    })
    const streamClient = new streamContract({
      contractId: streamNetwork.testnet.contractId,
      networkPassphrase: streamNetwork.testnet.networkPassphrase,
      rpcUrl: 'https://soroban-testnet.stellar.org',
      wallet: freighter,
    })

    Promise.all([
      tokenClient.balance({ id: tokenNetwork.testnet.contractId }),
      tokenClient.decimals(),
      tokenClient.name(),
      tokenClient.symbol(),

      streamClient.getStreamsByUser({ caller: account?.address || 'GAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWHF' }),
    ]).then(fetched => {
      setToken({
        balance: fetched[0].result,
        decimals: fetched[1].result,
        name: fetched[2].result.toString(),
        symbol: fetched[3].result.toString(),
      })

      setUserStreams(fetched[4].result)
    }).catch(err => {
      console.error(err)
    })
  }, [account, updatedAt])

  return {
    token,
    userStreams,
    updatedAt,
    refresh: () => setUpdatedAt(Date.now()),
  }
}
