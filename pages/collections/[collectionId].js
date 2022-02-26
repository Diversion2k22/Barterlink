import { useRouter } from 'next/router'
import React from 'react'
import Link from 'next/link'
const Collection = () => {
  const router = useRouter()

  return (
    <Link href="/">
      <h2>{router.query.collectionId}</h2>
    </Link>
  )
}

export default Collection
