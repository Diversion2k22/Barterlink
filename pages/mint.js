import { ThirdwebSDK } from '@3rdweb/sdk'
import React, { useMemo } from 'react'
import { useWeb3 } from '@3rdweb/hooks'

const MintButton = () => {
  const { address, provider } = useWeb3()
  const nftModule = useMemo(() => {
    if (!provider) return
    console.log(provider.getSigner())
    const sdk = new ThirdwebSDK(provider.getSigner())
    console.log(sdk)
    return sdk.getNFTModule('0x9C8B777B905E8185960bED570dC6c2E727925263')
  }, [provider])

  const onMintHandler = async () => {
    // Address of the wallet you want to mint the NFT to
    await nftModule.grantRole(
      'minter',
      '0x590Db7F78427BFBF99e700Eb4CADA95165Ed5DF8'
    )
    // Custom metadata of the NFT, note that you can fully customize this metadata with other properties.
    // const metadata = {
    //   name: 'BarterLinks',
    //   description: 'Logos Of barterlink',
    //   image: 'ipfs://QmULf6NHVU2HhMSEKU66dx2MrUyT57r7VK77by48kSM47x', // This can be an image url or file
    // }

    // await nftModule.mintTo(address, metadata)
  }

  return (
    <button
      className="cursor-pointer rounded-lg border border-[#282b2f] bg-[#2081e2] p-[0.8rem] text-xl font-semibold text-black"
      onClick={onMintHandler}
    >
      Mint NFT
    </button>
  )
}

export default MintButton
