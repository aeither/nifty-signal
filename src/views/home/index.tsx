// Next, React
import { FC } from 'react'

// Wallet
import { useConnection, useWallet } from '@solana/wallet-adapter-react'

// Components
import { RequestAirdrop } from '../../components/RequestAirdrop'

import { LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js'
import { QueryFunctionContext, useQuery } from '@tanstack/react-query'
import { HistoryTable, History } from 'components/HistoryTable'

interface Balance {
  tokens: []
  nativeBalance: number
}

if (!process.env.NEXT_PUBLIC_API_KEY)
  throw new Error('NEXT_PUBLIC_API_KEY not found')
const API_KEY = process.env.NEXT_PUBLIC_API_KEY

export const HomeView: FC = ({}) => {
  const wallet = useWallet()
  const { publicKey } = wallet
  const { connection } = useConnection()
  const { data: balance } = useQuery<Balance>({
    queryKey: ['balance', publicKey],
    queryFn: async ({
      queryKey,
    }: QueryFunctionContext<[string, PublicKey | undefined]>) => {
      const [_key, publicKey] = queryKey
      if (!publicKey) {
        console.log('no address')
        return
      }
      return await fetch(
        `https://api.helius.xyz/v0/addresses/${publicKey.toBase58()}/balances?api-key=${API_KEY}`
      ).then((data) => data.json())
    },
  })
  const { data: history } = useQuery<History[]>({
    queryKey: ['history', publicKey],
    queryFn: async ({
      queryKey,
    }: QueryFunctionContext<[string, PublicKey | undefined]>) => {
      const [_key, publicKey] = queryKey
      if (!publicKey) {
        console.log('no address')
        return
      }
      return await fetch(
        `https://api.helius.xyz/v0/addresses/${publicKey.toBase58()}/transactions?api-key=${API_KEY}`
      ).then((data) => data.json())
    },
  })

  return (
    <div className="md:hero mx-auto p-4">
      <div className="md:hero-content flex flex-col">
        <h1 className="text-center text-5xl md:pl-12 font-bold text-transparent bg-clip-text bg-gradient-to-tr from-[#9945FF] to-[#14F195]">
          Scaffold Lite{' '}
        </h1>
        <div className="text-center">
          <RequestAirdrop />
          {/* {wallet.publicKey && <p>Public Key: {wallet.publicKey.toBase58()}</p>} */}
          <h2>Balance</h2>
          {balance && (
            <p>
              {(balance.nativeBalance / LAMPORTS_PER_SOL || 0).toLocaleString()}
            </p>
          )}
          <h2>History</h2>
          {history && <HistoryTable data={history} />}
        </div>
      </div>
    </div>
  )
}
