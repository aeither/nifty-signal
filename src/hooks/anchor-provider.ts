import React, { ReactChild, useContext } from 'react'
import { useAnchorWallet, useConnection } from '@solana/wallet-adapter-react'
import { AnchorProvider } from '@project-serum/anchor'
import { Keypair, Connection } from '@solana/web3.js'

export const useAnchorProvider = () => {
  const RPC_URL = process.env.NEXT_PUBLIC_RPC_URL

  const wallet = useAnchorWallet()
  const provider = React.useMemo(() => {
    const c = new Connection(RPC_URL)

    if (!wallet) {
      // @ts-ignore
      return new AnchorProvider(c, Keypair.generate(), {})
    }
    const provider = new AnchorProvider(c, wallet, {
      preflightCommitment: 'processed',
      commitment: 'processed',
    })

    return provider
  }, [wallet])

  return { anchorProvider: provider }
}
