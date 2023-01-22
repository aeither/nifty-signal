import { FC } from 'react'
import Link from 'next/link'

import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { useAutoConnect } from '../contexts/AutoConnectProvider'

export const AppBar: FC = (props) => {
  const { autoConnect, setAutoConnect } = useAutoConnect()

  return (
    <>
      {/* NavBar / Header */}
      <div className="fixed w-full navbar flex flex-row md:mb-2 shadow-lg z-50 bg-blue-800/60 backdrop-blur-lg text-neutral-content">
        <div className="navbar-start">
          <h2 className="font-bold italic text-xl pl-4 transition cursor-pointer rotate-0 hover:rotate-6">
            NiftySignal
          </h2>
        </div>

        {/* Nav Links */}
        <div className="hidden md:inline md:navbar-center">
          {/* <div className="flex items-stretch">
            <Link href="/">
              <a className="btn btn-ghost btn-sm rounded-btn">Home</a>
            </Link>
            <Link href="/basics">
              <a className="btn btn-ghost btn-sm rounded-btn">Basics</a>
            </Link>
          </div> */}
        </div>

        {/* Wallet & Settings */}
        <div className="navbar-end">
          <WalletMultiButton className="btn btn-ghost mr-4" />
        </div>
      </div>
      {props.children}
    </>
  )
}
