import {
  connect,
  signMessage,
  disconnect,
  getBalance,
  signAndSendTransaction,
  getConnectorIsAvailable,
  PhantomConnector,
  watchAddress,
  getFeeForMessage,
  getTransaction,
  watchTransaction,
  fetchName,
  fetchAddressFromDomain,
  getAccount,
} from '@walletconnect/solib'
import { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const useSolib = () => {
  console.log(
    'Phantom is ready',
    getConnectorIsAvailable(PhantomConnector.connectorName())
  )
  const [address, setAddress] = useState<string | undefined>('')
  const [name, setName] = useState<string | undefined>('')
  const [balance, setBalance] = useState<string | undefined>('')
  const [signature, setSignature] = useState<string | undefined>('')
  const [message, setMessage] = useState<string | undefined>('')
  const [toAddress, setToAddress] = useState<string | undefined>('')
  const [amount, setAmount] = useState<number>(0)

  useEffect(() => {
    console.log('ya hey')
    watchAddress((address2) => {
      console.log('Got address', address2)
      setAddress(address2)
    })
  }, [setAddress])

  useEffect(() => {
    if (address) {
      getBalance().then((value) =>
        setBalance(value?.decimals.toString() ?? '0')
      )
      fetchName('FidaeBkZkvDqi1GXNEwB8uWmj9Ngx2HXSS5nyGRuVFcZ').then(
        (name2) => {
          setName(name2?.reverse ?? address)
        }
      )
      fetchAddressFromDomain('bonfida.sol').then((addr) => {
        console.log({ addressFromDomain: addr })
      })
      getAccount().then((acc) => console.log({ accthing: acc?.rentEpoch }))
    }
  }, [address])

  const onClick = useCallback(() => {
    connect().then((publicKey) => {
      console.log({ publicKey })
    })
  }, [])

  const onSign = useCallback((message2: string | undefined) => {
    if (message2)
      signMessage(message2).then((signature2) => {
        setSignature(signature2 ?? '')
      })
  }, [])

  const onSendTransaction = useCallback(
    (to: string, amountInLamports: number) => {
      console.log({ to, amountInLamports })

      getFeeForMessage('transfer', {
        to,
        amountInLamports,
        feePayer: 'from',
      }).then((fee) => console.log({ fee }))

      if (to && amountInLamports)
        signAndSendTransaction('transfer', {
          to,
          amountInLamports,
          feePayer: 'from',
        }).then(async (result) => {
          console.log({ result })
          if (result)
            await watchTransaction(result, () => {
              getTransaction(result).then((tra) => console.log({ tra }))
              toast.success('Transaction successful!')
            })
        })
    },
    [toast]
  )
  
  return {
    
  }
}

export default useSolib
