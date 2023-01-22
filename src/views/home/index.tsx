// Next, React
import { FC, useState } from 'react'

// Wallet

import { LAMPORTS_PER_SOL } from '@solana/web3.js'
import clsx from 'clsx'
import { HistoryTable } from 'components/HistoryTable'
import { MintsTable } from 'components/MintsTable'
import useHelius from 'hooks/use-helius'
import useStore from 'stores/use-store'
import { SavedTable } from 'components/SavedTable'

if (!process.env.NEXT_PUBLIC_API_KEY)
  throw new Error('NEXT_PUBLIC_API_KEY not found')
const API_KEY = process.env.NEXT_PUBLIC_API_KEY

export const HomeView: FC = ({}) => {
  const { saved, insert, reset, select, selected, remove } = useStore()
  const [activeTab, setActiveTab] = useState(1)
  const [nftCreator, setNftCreator] = useState(
    'A4FM6h8T5Fmh9z2g3fKUrKfZn6BNFEgByR8QGpdbQhk1'
  ) // default to y00ts
  const { balance, history, mints } = useHelius()

  const List = () => <>{mints && <MintsTable data={mints} />}</>

  const Favourite = () => (
    <>
      <SavedTable data={saved} remove={remove} />
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
    <div className="container">
      <div className="md:hero-content flex flex-col">
        {/* select collection */}
        <p>Current Collection: {selected}</p>
        <fieldset>
          <label className="label">
            <span className="label-text">Collection creator address</span>
          </label>
          <input
            type="text"
            className="input input-bordered"
            onChange={(e) => setNftCreator(e.target.value)}
          />
          <button
            className="btn btn-primary"
            onClick={() => select(nftCreator)}
          >
            Select
          </button>
        </fieldset>

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
        <div className={clsx('w-full', activeTab != 0 && 'hidden')}>
          <List />
        </div>
        <div className={clsx('w-full', activeTab != 1 && 'hidden')}>
          <Favourite />
        </div>
        <div className={clsx('w-full', activeTab != 2 && 'hidden')}>
          <Profile />
        </div>
        {/* {wallet.publicKey && <p>Public Key: {wallet.publicKey.toBase58()}</p>} */}
      </div>
    </div>
  )
}
