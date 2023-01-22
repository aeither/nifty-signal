import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {
  init,
  InjectedConnector,
  mainnetBetaBlockDaemon,
  PhantomConnector,
  StoreConfig,
  WalletConnectConnector,
} from '@walletconnect/solib'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { FC } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AppBar } from '../components/AppBar'
import { ContentContainer } from '../components/ContentContainer'
import { Footer } from '../components/Footer'
import Notifications from '../components/Notification'
import { ContextProvider } from '../contexts/ContextProvider'

require('@solana/wallet-adapter-react-ui/styles.css')
require('../styles/globals.css')

const queryClient = new QueryClient()

const App: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Solana Scaffold Lite</title>
      </Head>

      <QueryClientProvider client={queryClient}>
        <ContextProvider>
          <div className="flex flex-col h-screen">
            <Notifications />
            <ToastContainer />

            <AppBar />
            <ContentContainer>
              <div className="flex items-center justify-center mt-16">
                <Component {...pageProps} />
              </div>
            </ContentContainer>
          </div>
        </ContextProvider>
      </QueryClientProvider>
    </>
  )
}

export default App
