import '../styles/globals.css'
import { ThirdwebWeb3Provider } from '@3rdweb/hooks'
//chain ID 4 represent Rinkby testnet
//injected is web3 connection used by metamask
const supportedChainIds = [4]
const connectors = {
  injected: {},
}
function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
