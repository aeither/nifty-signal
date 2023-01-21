import { FC, useCallback } from 'react'
import { SignMessage } from '../../components/SignMessage'
import { SendTransaction } from '../../components/SendTransaction'
import { connect } from '@walletconnect/solib'

export const BasicsView: FC = ({}) => {
  const onClick = useCallback(() => {
    connect().then((publicKey) => {
      console.log({ publicKey })
    })
  }, [])

  return (
    <div className="md:hero mx-auto p-4">
      <div className="md:hero-content flex flex-col">
        <h1 className="text-center text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-tr from-[#9945FF] to-[#14F195]">
          Basics
        </h1>
        {/* CONTENT GOES HERE */}
        <button onClick={onClick}>Connect</button>

        <div className="text-center">
          <SignMessage />
          <SendTransaction />
        </div>
      </div>
    </div>
  )
}
