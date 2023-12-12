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

  const tokenClient = new tokenContract({
    contractId: tokenNetwork.futurenet.contractId,
    networkPassphrase: tokenNetwork.futurenet.networkPassphrase,
    rpcUrl: 'https://rpc-futurenet.stellar.org:443',
    wallet: freighter,
  })
  const streamClient = new streamContract({
    contractId: streamNetwork.futurenet.contractId,
    networkPassphrase: streamNetwork.futurenet.networkPassphrase,
    rpcUrl: 'https://rpc-futurenet.stellar.org:443',
    wallet: freighter,
  })

  useEffect(() => {
    Promise.all([
      tokenClient.balance({ id: tokenNetwork.futurenet.contractId }),
      tokenClient.decimals(),
      tokenClient.name(),
      tokenClient.symbol(),

      streamClient.getStreamsByUser({ caller: account?.address || 'GDZDBDNC2HX5FTQQJE64LJBEI4PO4BXQX25ASGUOCK4H3VBW6GCR45RR' }),
    ]).then(fetched => {
      setToken({
        balance: fetched[0],
        decimals: fetched[1],
        name: fetched[2].toString(),
        symbol: fetched[3].toString(),
      })

      setUserStreams(fetched[4])
    }).catch(err => {
      console.error(err)
    })
  }, [updatedAt, account])

  return {
    token,
    userStreams,
    updatedAt,
    refresh: () => setUpdatedAt(Date.now()),
  }
}
