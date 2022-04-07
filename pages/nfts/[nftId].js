import Header from '../../components/Header'
import { useWeb3 } from '@3rdweb/hooks'
import { useEffect, useMemo, useState } from 'react'
import React from 'react'
import { ThirdwebSDK } from '@3rdweb/sdk'
import { ThirdwebSDK as ThirdS } from '@thirdweb-dev/sdk'
import { useRouter } from 'next/router'
import NFTImage from '../../components/nft/NFTImage'
import GeneralDetails from '../../components/nft/GeneralDetails'
import ItemActivity from '../../components/nft/ItemActivity'
import Purchase from '../../components/nft/Purchase'

const style = {
  wrapper: `flex flex-col items-center container-lg text-[#e5e8eb]`,
  container: `container p-6`,
  topContent: `flex`,
  nftImgContainer: `flex-1 mr-4`,
  detailsContainer: `flex-[2] ml-4`,
}
const Nft = () => {
  const [selectedNft, setSelectedNft] = useState()
  const [listings, setListings] = useState([])
  const [price, setPrice] = useState()
  const [owner, setOwner] = useState()
  const router = useRouter()
  const { provider, address } = useWeb3()
  const nftModule = useMemo(() => {
    if (!provider) return

    const sdk = new ThirdwebSDK(
      provider.getSigner()
      // 'https://rinkeby.infura.io/v3/a464b9152d8c466c8a94a514fce8e837'
    )
    return sdk.getNFTModule('0x39aad5c3DfD0C1799e442193ED1a445bd12E0a74')
  }, [provider])

  //get all the NFTs in the collection
  useEffect(() => {
    if (!nftModule) return
    ;(async () => {
      const nfts = await nftModule.getAll()
      const selectedNft = nfts.find((nft) => nft.id === router.query.nftId)
      console.log(selectedNft)
      setSelectedNft(selectedNft)
    })()
  }, [nftModule])

  const marketPlaceModule = useMemo(() => {
    if (!provider) return

    const sdk = new ThirdwebSDK(
      provider.getSigner()
      // 'https://rinkeby.infura.io/v3/a464b9152d8c466c8a94a514fce8e837'
    )
    return sdk.getMarketplaceModule(
      '0xc64558a0Dd37668e9fceB3013707889d8a655816'
    )
  }, [provider])

  // get all listings in the collection
  useEffect(() => {
    if (!marketPlaceModule) return
    ;(async () => {
      const sdk = new ThirdS(
        provider.getSigner()
        // 'https://rinkeby.infura.io/v3/a464b9152d8c466c8a94a514fce8e837'
      )
      const marketplace = sdk.getMarketplace(
        '0xc64558a0Dd37668e9fceB3013707889d8a655816'
      )
      setListings(await marketplace.getActiveListings())
      console.log(listings)
    })()
  }, [marketPlaceModule])

  {
    nftModule?.ownerOf(selectedNft?.id).then((res) => {
      setOwner(res)
    })
  }

  return (
    <div>
      <Header />
      <div className={style.wrapper}>
        <div className={style.container}>
          <div className={style.topContent}>
            <div className={style.nftImgContainer}>
              <NFTImage selectedNft={selectedNft} />
            </div>
            <div className={style.detailsContainer}>
              <GeneralDetails selectedNft={selectedNft} owner={owner} />
              <Purchase
                price={price}
                isListed={router.query.isListed}
                selectedNft={selectedNft}
                listings={listings}
                marketPlaceModule={marketPlaceModule}
                id={router.query.nftId}
                owner={owner}
              />
            </div>
          </div>
          <ItemActivity />
        </div>
      </div>
    </div>
  )
}

export default Nft
