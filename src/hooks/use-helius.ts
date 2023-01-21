// Next, React

// Wallet
import { useWallet } from '@solana/wallet-adapter-react'

// Components

import { PublicKey } from '@solana/web3.js'
import { QueryFunctionContext, useQuery } from '@tanstack/react-query'
import { History } from 'components/HistoryTable'
import useStore from 'stores/use-store'

export interface Balance {
  tokens: []
  nativeBalance: number
}

export interface Mints {
  result: Result[]
  paginationToken: string
}

export interface Result {
  mint: string
  name: string
}

if (!process.env.NEXT_PUBLIC_API_KEY)
  throw new Error('NEXT_PUBLIC_API_KEY not found')
const API_KEY = process.env.NEXT_PUBLIC_API_KEY

export default function useHelius() {
  const wallet = useWallet()
  const { selected } = useStore()
  const { publicKey } = wallet

  //  Get list of NFTs
  const { data: events } = useQuery<Balance>({
    queryKey: ['favourite', selected],
    queryFn: async ({
      queryKey,
    }: QueryFunctionContext<[string, string | undefined]>) => {
      const [_key, selected] = queryKey
      if (!selected) {
        console.log('no address')
        return
      }

      const body = {
        query: {
          firstVerifiedCreators: [selected],
        },
        options: { limit: 100 },
      }
      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      }

      return await fetch(
        `https://api.helius.xyz/v1/mintlist?api-key=${API_KEY}`,
        options
      ).then((data) => data.json())
    },
  })

  //  Get list of NFTs
  const { data: mints } = useQuery<Mints>({
    queryKey: ['favourite', selected],
    queryFn: async ({
      queryKey,
    }: QueryFunctionContext<[string, string | undefined]>) => {
      const [_key, selected] = queryKey
      if (!selected) {
        console.log('no address')
        return
      }

      const body = {
        query: {
          firstVerifiedCreators: [selected],
        },
        options: { limit: 100 },
      }
      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      }

      return await fetch(
        `https://api.helius.xyz/v1/mintlist?api-key=${API_KEY}`,
        options
      ).then((data) => data.json())
    },
  })

  //   get connect balance
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

  //   get connect history activities
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

  return {
    balance,
    history,
    mints,
  }
}
