// Next, React
import { FC, useState } from 'react'

// Wallet

// Components
import { RequestAirdrop } from '../../components/RequestAirdrop'

import { LAMPORTS_PER_SOL } from '@solana/web3.js'
import { HistoryTable } from 'components/HistoryTable'
import useHelius from 'hooks/use-helius'
import useStore from 'stores/use-store'
import clsx from 'clsx'
import { MintsTable } from 'components/MintsTable'

if (!process.env.NEXT_PUBLIC_API_KEY)
  throw new Error('NEXT_PUBLIC_API_KEY not found')
const API_KEY = process.env.NEXT_PUBLIC_API_KEY

export const HomeView: FC = ({}) => {
  const { saved, insert, reset, select, selected } = useStore()
  const [activeTab, setActiveTab] = useState(1)
  const { balance, history, mints } = useHelius()
  console.log('🚀 ~ file: index.tsx:24 ~ mints', mints)

  const List = () => (
    <>
      {mints && <MintsTable data={mints} />}
      <button onClick={() => insert('hello')}>increase</button>
    </>
  )

  const Favourite = () => (
    <>
      <h2>Mints</h2>
      {saved.map((mint) => (
        <>
          <div className="flex flex-col">{mint}</div>
        </>
      ))}
      <button onClick={() => reset()}>reset</button>
    </>
  )

  const Profile = () => (
    <>
      <h2>Balance</h2>
      {balance && (
        <p>
          {(balance.nativeBalance / LAMPORTS_PER_SOL || 0).toLocaleString()}
        </p>
      )}
      <h2>History</h2>
      {history && <HistoryTable data={history} />}
    </>
  )

  return (
    <div className="md:hero mx-auto p-4">
      <div className="md:hero-content flex flex-col">
        <h1 className="text-center text-5xl md:pl-12 font-bold text-transparent bg-clip-text bg-gradient-to-tr from-[#9945FF] to-[#14F195]">
          Scaffold Lite{' '}
        </h1>

        {/* select collection */}
        <p>selected: {selected}</p>
        <button
          onClick={() =>
            selected === 'hello'
              ? select('A4FM6h8T5Fmh9z2g3fKUrKfZn6BNFEgByR8QGpdbQhk1')
              : select('hello')
          }
        >
          increase
        </button>

        <div className="text-center">
          <div className="tabs">
            {['List', 'Favourite', 'Profile'].map((title, index) => (
              <>
                <a
                  key={index}
                  className={clsx(
                    'tab tab-bordered',
                    activeTab === index && 'tab-active'
                  )}
                  onClick={() => setActiveTab(index)}
                >
                  {title}
                </a>
              </>
            ))}
          </div>
          <div className={clsx(activeTab != 0 && 'hidden')}>
            <List />
          </div>
          <div className={clsx(activeTab != 1 && 'hidden')}>
            <Favourite />
          </div>
          <div className={clsx(activeTab != 2 && 'hidden')}>
            <Profile />
          </div>
          {/* {wallet.publicKey && <p>Public Key: {wallet.publicKey.toBase58()}</p>} */}
        </div>
      </div>
    </div>
  )
}
