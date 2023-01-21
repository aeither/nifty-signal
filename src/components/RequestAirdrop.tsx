import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { LAMPORTS_PER_SOL, TransactionSignature } from '@solana/web3.js'
import { FC, useCallback } from 'react'
import { notify } from '../utils/notifications'

export const RequestAirdrop: FC = () => {
  const { connection } = useConnection()
  const { publicKey } = useWallet()

  return <div></div>
}
