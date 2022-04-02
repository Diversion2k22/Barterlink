import '../styles/globals.css'
import { ThirdwebWeb3Provider } from '@3rdweb/hooks'
import { ThirdwebProvider } from '@thirdweb-dev/react'
//chain ID 4 represent Rinkby testnet
//injected is web3 connection used by metamask
const supportedChainIds = [4]
const connectors = {
  injected: {},
}
function MyApp({ Component, pageProps }) {
  return (
    <ThirdwebWeb3Provider
      supportedChainIds={supportedChainIds}
      connectors={connectors}
    >
      <ThirdwebProvider>
        <Component {...pageProps} />
      </ThirdwebProvider>
    </ThirdwebWeb3Provider>
  )
}

export default MyApp
