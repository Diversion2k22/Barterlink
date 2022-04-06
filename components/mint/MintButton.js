import { ThirdwebSDK } from '@3rdweb/sdk'
import React, { useMemo, useRef, useState } from 'react'
import { useWeb3 } from '@3rdweb/hooks'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'
import Link from 'next/link'

const MintButton = () => {
  const { address, provider } = useWeb3()
  const [show, setShow] = useState(false)
  const [img, setImg] = useState()
  const [minter, setMinter] = useState(false)
  const [path, setPath] = useState()
  const nftModule = useMemo(() => {
    if (!provider) return
    console.log(provider.getSigner())
    const sdk = new ThirdwebSDK(provider.getSigner())
    console.log(sdk)

    return sdk.getNFTModule('0x39aad5c3DfD0C1799e442193ED1a445bd12E0a74')
  }, [provider])
  const nameRef = useRef()
  const imgRef = useRef()
  const desRef = useRef()
  const welcomeUser = (toastHandler = toast) => {
    toastHandler.success(`Minted Successfully!`, {
      style: {
        background: '#04111d',
        color: '#fff',
      },
    })
  }

  const onMintHandler = async (e) => {
    // Address of the wallet you want to mint the NFT to
    // await nftModule.grantRole(
    //   'minter',
    //   '0x590Db7F78427BFBF99e700Eb4CADA95165Ed5DF8'
    // )
    // Custom metadata of the NFT, note that you can fully customize this metadata with other properties.
    e.preventDefault()
    // make a backend server api request to mint an NFT
    const formData = new FormData()
    formData.append('name', nameRef.current.value)
    formData.append('desc', desRef.current.value)
    formData.append('image', img)
    console.log(formData.get('image'))
    // const config = {
    //   url: 'http://localhost:3005/h',
    //   method: 'GET',
    //   timeout: '60000',
    // }

    const config = {
      url: 'http://localhost:3005/push_ipfs',
      method: 'POST',
      timeout: '60000',
      data: formData,
    }

    axios(config)
      .then(async (res) => {
        console.log(res)
        const metadata = {
          name: nameRef.current.value,
          description: desRef.current.value,
          image: `ipfs://${res.data}`, // This can be an image url or file
        }
        const imgURL = `ipfs.io/ipfs/${res.data}`
        if (minter) {
          await nftModule.mintTo(address, metadata)
          setPath('')
        } else {
          setPath(imgURL)
          setShow(true)
        }
      })
      .then(() => {
        welcomeUser()
      })
  }

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-[#3b3d42]">
      <div className="top-0 mt-0 mb-0 h-1/2 w-3/6">
        <Toaster position="top-center" reverseOrder={false} />
        <h1 className="text-3xl font-bold text-white">
          You need special roles to mint to Barterplace.(Comming Soon) For now
          you can upload your image to IPFS and view it.
        </h1>
        <form className="f1" id="f1" onSubmit={onMintHandler}>
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
            <input
              type="file"
              id="image"
              name="image"
              onChange={(e) => {
                setImg(e.target.files[0])
              }}
            />
          </div>

          <input
            type="submit"
            className="cursor-pointer rounded-lg border border-[#282b2f] bg-[#2081e2] p-[0.8rem] text-xl font-semibold text-black"
            value="Mint NFT"
          />
        </form>
        {show ? (
          <div className="mt-6">
            <div className="flex justify-center">
              <div className="w-full">
                <Link href={`https://${path}`} passHref={true}>
                  <a target="_blank" className="text-xl font-bold text-white">
                    <button className="cursor-pointer rounded-lg border border-[#282b2f] bg-[#d6dc1f] p-[0.8rem] text-xl font-semibold text-black">
                      {' '}
                      View NFT
                    </button>
                  </a>
                </Link>
              </div>
            </div>
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  )
}

export default MintButton
