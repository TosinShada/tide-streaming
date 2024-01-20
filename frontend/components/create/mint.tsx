import { Button } from '@/components/ui/button'
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useToast } from '@/components/ui/use-toast'
import { useState } from 'react'
import { useAccount } from '@/hooks'
import {
  Contract as tokenContract,
  networks as tokenNetwork,
} from 'mock-client'
import freighter from '@stellar/freighter-api'

export function MintToken() {
  const [isLoading, setIsLoading] = useState(false)
  const account = useAccount()
  const { toast } = useToast()

  const tokenClient = new tokenContract({
    contractId: tokenNetwork.testnet.contractId,
    networkPassphrase: tokenNetwork.testnet.networkPassphrase,
    rpcUrl: 'https://soroban-testnet.stellar.org',
    wallet: freighter,
  })

  async function onSubmit() {
    setIsLoading(true)

    if (!account?.address) {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'Please connect your wallet.',
      })
      return
    }

    const amount = BigInt(100000000000000)

    const mintTokenRequest = {
      to: account.address,
      amount: amount,
    }

    console.log('mintTokenRequest', mintTokenRequest)

    await tokenClient
      .mint(mintTokenRequest)
      .then(simulationResult => {
        console.log('simulation result', simulationResult)
        // Sign and send the transaction
        simulationResult
          .signAndSend()
          .then(result => {
            console.log('result', result)
            toast({
              variant: 'default',
              title: 'Success!',
              description: 'Tokens successfully minted.',
            })
          })
          .catch((error: any) => {
            console.log('error', error)
            toast({
              variant: 'destructive',
              title: 'Uh oh! Something went wrong.',
              description: `${error?.message ?? 'An error occured.'}`,
            })
          })
          .finally(() => {
            setIsLoading(false)
          })
      })
      .catch((error: any) => {
        console.log('error', error)
        setIsLoading(false)
        toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong.',
          description: `${error?.message ?? 'An error occured.'}`,
        })
      })
  }

  return (
    <>
      <CardHeader className="flex items-center justify-between space-y-2">
        <CardTitle>Mint Mock Token</CardTitle>
        <CardDescription className="text-center">
          Click the below button to mint 10,000,000 Mock Tokens to your wallet.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <Button type="submit" size="lg" disabled={isLoading} onClick={onSubmit}>
          Mint Token
        </Button>
      </CardContent>
    </>
  )
}
