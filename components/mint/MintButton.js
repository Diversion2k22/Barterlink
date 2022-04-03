import { ThirdwebSDK } from '@3rdweb/sdk'
import React, { useMemo, useRef } from 'react'
import { useWeb3 } from '@3rdweb/hooks'

const MintButton = () => {
  const { address, provider } = useWeb3()
  const nftModule = useMemo(() => {
    if (!provider) return
    console.log(provider.getSigner())
    const sdk = new ThirdwebSDK(provider.getSigner())
    console.log(sdk)
    return sdk.getNFTModule('0xcdfCB3d9bE5C5E97Ee4BF7710DaAE6D5F74C30a9')
  }, [provider])
  const nameRef = useRef()
  const imgRef = useRef()
  const desRef = useRef()
  const onMintHandler = async () => {
    // Address of the wallet you want to mint the NFT to
    // await nftModule.grantRole(
    //   'minter',
    //   '0x590Db7F78427BFBF99e700Eb4CADA95165Ed5DF8'
    // )
    // Custom metadata of the NFT, note that you can fully customize this metadata with other properties.

    // make a backend server api request to mint an NFT

    // const url = await fetch('http://localhost:3005/img_add', {
    //   method: 'GET',
    //   headers: {
    //     'content-type': 'application/json',
    //   },
    // })

    fetch('http://localhost:3005/img_add').then((res) => {
      console.log(res)
    })

    // const metadata = {
    //   name: nameRef.current.value,
    //   description: desRef.current.value,
    //   image: url, // This can be an image url or file
    // }

    // await nftModule.mintTo(address, metadata)
  }

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-[#3b3d42]">
      <div className="top-0 mt-0 mb-0 h-1/2 w-3/6">
        <form
          className="f1"
          id="f1"
          method="POST"
          action="http://localhost:3005/push_ipfs"
          encType="multipart/Form-data"
        >
          <div className="mb-6">
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              NFT name
            </label>
            <input
              type="text"
              id="name"
              className=" w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="Name your NFT"
              required
              name="name"
              ref={nameRef}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="description"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              NFT description
            </label>
            <input
              type="text"
              id="desc"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              required
              name="desc"
              ref={desRef}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Image URL
            </label>
            <input type="file" id="image" name="image" ref={imgRef} />
          </div>

          <input
            type="submit"
            className="cursor-pointer rounded-lg border border-[#282b2f] bg-[#2081e2] p-[0.8rem] text-xl font-semibold text-black"
            value="Add NFT"
          />
        </form>
        <button
          className="cursor-pointer rounded-lg border border-[#282b2f] bg-[#2081e2] p-[0.8rem] text-xl font-semibold text-black"
          value="Mint"
          onClick={onMintHandler}
        >
          Mint
        </button>
      </div>
    </div>
  )
}

// <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
export default MintButton
