import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import openseaLogo from '../assets/logo.png'
import { AiOutlineSearch } from 'react-icons/ai'
import { CgProfile } from 'react-icons/cg'
import { MdOutlineAccountBalanceWallet } from 'react-icons/md'
import { useWeb3 } from '@3rdweb/hooks'
import { useMetamask } from '@thirdweb-dev/react'
import toast, { Toaster } from 'react-hot-toast'
const style = {
  wrapper: `bg-[#04111d] w-screen px-[1.2rem] py-[0.8rem] flex `,
  logoContainer: `flex items-center cursor-pointer`,
  logoText: ` ml-[0.8rem] text-white font-semibold text-2xl`,
  searchBar: `flex flex-1 mx-[0.8rem] w-max-[520px] items-center bg-[#363840] rounded-[0.8rem] hover:bg-[#4c505c]`,
  searchIcon: `text-[#8a939b] mx-3 font-bold text-lg`,
  searchInput: `h-[2.6rem] w-full border-0 bg-transparent outline-0 ring-0 px-2 pl-0 text-[#e6e8eb] placeholder:text-[#8a939b]`,
  headerItems: ` flex items-center justify-end`,
  headerItem: `text-white px-4 font-bold text-[#c8cacd] hover:text-white cursor-pointer`,
  headerIcon: `text-[#8a939b] text-3xl font-black px-4 hover:text-white cursor-pointer`,
}

const Header = () => {
  const { address, connectWallet, disconnectWallet } = useWeb3()
  const [connected, setConnected] = useState(false)
  useEffect(() => {
    if (address) {
      setConnected(true)
    }
  }, [address])
  const welcomeUser = (toastHandler = toast) => {
    toastHandler.success(`Connected to ${address}!`, {
      style: {
        background: '#04111d',
        color: '#fff',
      },
    })
  }
  return (
    <div className={style.wrapper}>
      <Toaster position="top-center" reverseOrder={false} />
      <Link href="/">
        <div className={style.logoContainer}>
          <Image src={openseaLogo} height={40} width={40}></Image>
          <div className={style.logoText}>Barterplace</div>
        </div>
      </Link>
      <div className={style.searchBar}>
        <div className={style.searchIcon}>
          <AiOutlineSearch />
        </div>
        <input
          className={style.searchInput}
          placeholder="Search itens, collections and NFT"
        />
      </div>
      <div className={style.headerItems}>
        <Link href="/collections/0xF0F1CA164a58056dd0099872Ee251736ea399b1D">
          <div className={style.headerItem}>Collections</div>
        </Link>
        <Link href="/mint">
          <div className={style.headerItem}>Mint</div>
        </Link>

        <Link href={`/users/${address}`}>
          <div className={style.headerItem}>
            {' '}
            <CgProfile />
          </div>
        </Link>

        <button
          className={style.headerIcon}
          onClick={() => {
            if (connected) {
              disconnectWallet('injected')
            } else {
              connectWallet('injected')
            }
          }}
        >
          <MdOutlineAccountBalanceWallet />
        </button>
      </div>
    </div>
  )
}

export default Header
