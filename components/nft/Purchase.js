import { useEffect, useMemo, useRef, useState } from 'react'

import { HiTag } from 'react-icons/hi'
import { IoMdWallet } from 'react-icons/io'
import toast, { Toaster } from 'react-hot-toast'
import { client } from '../../lib/sanityClient'
import { NATIVE_TOKEN_ADDRESS, ThirdwebSDK as ThirdS } from '@thirdweb-dev/sdk'
import { ThirdwebSDK } from '@3rdweb/sdk'
import { useWeb3 } from '@3rdweb/hooks'
import { MarketplaceModule } from '@3rdweb/sdk'
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
  owner,
}) => {
  const [selectedMarketNft, setSelectedMarketNft] = useState()
  const [enableButton, setEnableButton] = useState(false)
  const { provider, address } = useWeb3()
  // const [message, setMessage] = useState('Success')
  const priceRef = useRef()
  useEffect(() => {
    if (!listings || isListed === 'false') return
    ;(async () => {
      setSelectedMarketNft(
        listings
          .slice()
          .reverse()
          .find((marketNft) => marketNft.asset.uri === selectedNft.uri)
      )
      {
        console.log(selectedMarketNft)
      }
    })()
  }, [selectedNft, listings, isListed])

  useEffect(() => {
    if (!selectedMarketNft || !selectedNft) return

    setEnableButton(true)
  }, [selectedMarketNft, selectedNft])

  const confirmMessage = ({ msg, type }) => {
    if (type === 'success') {
      toast.success(msg, {
        style: {
          background: '#04111d',
          color: '#fff',
        },
      })
    }
    if (type === 'error') {
      toast.error(msg, {
        style: {
          background: '#04111d',
          color: '#fff',
        },
      })
    }
  }
  {
    console.log(selectedMarketNft, 'selectedMarketNft')
  }
  const buyItem = async (
    listingId = selectedMarketNft.id,
    quantityDesired = 1,
    module = marketPlaceModule
  ) => {
    console.log(listings)
    console.log(listingId, quantityDesired, module, 'david')

    const userDoc = {
      _type: 'transactions',
      _id: `${selectedNft.name}_${new Date().getTime()}`,
      transactionId: `${selectedNft.name}_${new Date().getTime()}`,
      transactionType: 'purchase',
      transactionAmount:
        selectedMarketNft.buyoutCurrencyValuePerToken.displayValue,

      nftReference: {
        _type: 'reference',
        _ref: selectedMarketNft.asset.uri.split('/')[2],
      },
      transactionFrom: {
        _type: 'reference',
        _ref: address,
      },
      transactionTo: {
        _type: 'reference',
        _ref: owner,
      },
      transactionDate: new Date().toISOString(),
    }

    await module
      .buyoutDirectListing({
        listingId: listingId,
        quantityDesired: quantityDesired,
      })
      .then(async (res) => {
        const result = await client.createIfNotExists(userDoc)
        confirmMessage({ msg: 'Purchased Successful', type: 'success' })
      })
      .catch((error) => {
        console.log(error)
        console.log('error')
        confirmMessage({ msg: error.message.slice(0, 80), type: 'error' })
      })
  }
  // const marketPlaceModule = useMemo(() => {
  //   if (!provider) return

  //   const sdk = new ThirdwebSDK(
  //     provider.getSigner()
  //     // 'https://rinkeby.infura.io/v3/a464b9152d8c466c8a94a514fce8e837'
  //   )
  //   return sdk.getMarketplaceModule(
  //     '0xc64558a0Dd37668e9fceB3013707889d8a655816'
  //   )
  // }, [provider])
  const listItemHandler = async (module = marketPlaceModule) => {
    console.log(selectedMarketNft, 'selectedMarketNft')
    console.log(selectedNft, 'selectedNft')
    const sdk = new ThirdS(provider.getSigner())
    const marketplace = sdk.getMarketplace(
      '0xc64558a0Dd37668e9fceB3013707889d8a655816'
    )
    {
      console.log(marketplace)
    }
    console.log(marketPlaceModule, 'marketPlaceModule')
    const listing = {
      // address of the contract the asset you want to list is on
      assetContractAddress: '0x39aad5c3DfD0C1799e442193ED1a445bd12E0a74',
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
      currencyContractAddress: NATIVE_TOKEN_ADDRESS,
      // how much the asset will be sold for
      buyoutPricePerToken: priceRef.current.value,
    }
    const listDoc = {
      _type: 'transactions',
      _id: `${selectedNft.name}_${new Date().getTime()}`,
      transactionId: `${selectedNft.name}_${new Date().getTime()}`,
      transactionType: 'listing',
      transactionAmount: priceRef.current.value,

      nftReference: {
        _type: 'reference',
        _ref: selectedNft.uri.split('/')[2],
      },
      transactionFrom: {
        _type: 'reference',
        _ref: address,
      },

      transactionDate: new Date().toISOString(),
    }
    await marketplace.direct
      .createListing(listing)
      .then(async (res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
    await client.createIfNotExists(listDoc)
    confirmMessage({ msg: 'Listing Successful', type: 'success' })
  }

  return (
    <div className="flex h-20 w-full items-center rounded-lg border border-[#151c22] bg-[#303339] px-12">
      <Toaster position="bottom-left" reverseOrder={false} />
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
        <div>
          {owner === address ? (
            <div>
              <div
                className={`${style.button} border border-[#151c22]  bg-[#363840] hover:bg-[#4c505c]`}
              >
                <HiTag className={style.buttonIcon} />
                <input
                  type="text"
                  id="name"
                  className={`${style.button} dark:focus:ring-blue-500"  w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white
            dark:placeholder-gray-400 dark:focus:border-blue-500`}
                  required
                  placeholder="Set Price (ETH)"
                  name="name"
                  ref={priceRef}
                />
              </div>
              <div
                className={`${style.button} bg-[#2081e2] hover:bg-[#42a0ff]`}
                onClick={() => {
                  listItemHandler()
                }}
              >
                <IoMdWallet className={style.buttonIcon} />

                <button className={style.buttonText}>List Item</button>
              </div>{' '}
            </div>
          ) : (
            <div className={`${style.button} bg-[#2081e2] hover:bg-[#e93c19]`}>
              <IoMdWallet className={style.buttonIcon} />

              <button className={style.buttonText} disabled>
                List Item (you dont own)
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default MakeOffer
