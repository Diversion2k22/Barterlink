import { useEffect, useMemo, useState } from 'react'

import { HiTag } from 'react-icons/hi'
import { IoMdWallet } from 'react-icons/io'
import toast, { Toaster } from 'react-hot-toast'
import { ThirdwebSDK } from '@3rdweb/sdk'
import { ThirdwebSDK as ThirdS } from '@thirdweb-dev/sdk'
import { useWeb3 } from '@3rdweb/hooks'

const style = {
  button: `mr-8 flex items-center py-2 px-12 rounded-lg cursor-pointer`,
  buttonIcon: `text-xl`,
  buttonText: `ml-2 text-lg font-semibold`,
}

const MakeOffer = ({
  isListed,
  selectedNft,
  listings,
  marketPlaceModule,
  id,
}) => {
  const [selectedMarketNft, setSelectedMarketNft] = useState()
  const [enableButton, setEnableButton] = useState(false)
  const { provider } = useWeb3()
  useEffect(() => {
    if (!listings || isListed === 'false') return
    ;(async () => {
      setSelectedMarketNft(
        listings
          .slice()
          .reverse()
          .find((marketNft) => marketNft.asset.uri === selectedNft.uri)
      )
    })()
  }, [selectedNft, listings, isListed])

  useEffect(() => {
    if (!selectedMarketNft || !selectedNft) return

    setEnableButton(true)
  }, [selectedMarketNft, selectedNft])

  const confirmPurchase = (toastHandler = toast) =>
    toastHandler.success(`Purchase successful!`, {
      style: {
        background: '#04111d',
        color: '#fff',
      },
    })
  const nftModule = useMemo(() => {
    if (!provider) return

    const sdk = new ThirdwebSDK(
      provider.getSigner()
      // 'https://rinkeby.infura.io/v3/a464b9152d8c466c8a94a514fce8e837'
    )
    return sdk.getNFTModule('0xF0F1CA164a58056dd0099872Ee251736ea399b1D')
  }, [provider])
  const buyItem = async (
    listingId = selectedMarketNft.id,
    quantityDesired = 1,
    module = marketPlaceModule
  ) => {
    console.log(listingId, quantityDesired, module, 'david')
    // yo RAZA lets goooo!!!
    //yo Qazi, ok
    // sure okay about to run it...
    // just clicked buy now...
    // still error
    // where can i see the contract address of the marketplace module
    // in [nftId.js]
    await module
      .buyoutDirectListing({
        listingId: listingId,
        quantityDesired: quantityDesired,
      })
      .catch((error) => console.error(error))

    confirmPurchase()
  }
  const listItemHandler = async () => {
    console.log(selectedNft)
    const sdk = new ThirdS(provider.getSigner())
    const marketplace = sdk.getMarketplace(
      '0xc64558a0Dd37668e9fceB3013707889d8a655816'
    )
    const listing = {
      // address of the contract the asset you want to list is on
      assetContractAddress: '0xF0F1CA164a58056dd0099872Ee251736ea399b1D',
      // token ID of the asset you want to list
      tokenId: id,
      // in how many seconds with the listing open up
      startTimeInSeconds: 0,
      // how long the listing will be open for
      listingDurationInSeconds: 86400,
      // how many of the asset you want to list
      // For ERC721s, this value should always be 1
      // (and will be forced internally regardless of what is passed here).
      quantity: 1,
      // address of the currency contract that will be used to pay for the listing
      currencyContractAddress: '0xF0F1CA164a58056dd0099872Ee251736ea399b1D',
      // how much the asset will be sold for
      buyoutPricePerToken: 0.5,
    }

    await marketplace.direct
      .createListing(listing)
      .catch((err) => console.log(err))

    confirmPurchase()
  }
  return (
    <div className="flex h-20 w-full items-center rounded-lg border border-[#151c22] bg-[#303339] px-12">
      {isListed === 'true' ? (
        <div
          onClick={() => {
            enableButton ? buyItem(selectedMarketNft.id, 1) : null
          }}
          className={`${style.button} bg-[#2081e2] hover:bg-[#42a0ff]`}
        >
          <IoMdWallet className={style.buttonIcon} />
          <div className={style.buttonText}>
            Buy Now (
            {selectedMarketNft?.buyoutCurrencyValuePerToken.displayValue} ETH)
          </div>
        </div>
      ) : (
        // <div
        //   className={`${style.button} bg-[#2081e2] hover:bg-[#42a0ff]`}
        //   onClick={() => {
        //     listItemHandler()
        //   }}
        // >
        //   <IoMdWallet className={style.buttonIcon} />
        //   <button className={style.buttonText}>List Item</button>
        // </div>
        ' '
      )}
    </div>
  )
}

export default MakeOffer
