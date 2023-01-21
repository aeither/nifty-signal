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

const PROJECT_ID = process.env.NEXT_PUBLIC_PROJECT_ID || ''

init(() => {
  return {
    connectorName: WalletConnectConnector.connectorName,
    connectors: [
      new PhantomConnector(),
      new InjectedConnector('window.solflare'),
      new InjectedConnector('window.solana'),
      new WalletConnectConnector({
        relayerRegion: 'wss://relay.walletconnect.com',
        metadata: {
          description: 'Test app for solib',
          name: 'Test Solib dApp',
          icons: ['https://avatars.githubusercontent.com/u/37784886'],
          url: 'http://localhost:3000',
        },
        autoconnect: true,
        qrcode: false,
      }),
    ],
    chosenCluster: mainnetBetaBlockDaemon,
  } as StoreConfig
}, PROJECT_ID)

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
              <Component {...pageProps} />
            </ContentContainer>
            <Footer />
          </div>
        </ContextProvider>
      </QueryClientProvider>
    </>
  )
}

export default App
