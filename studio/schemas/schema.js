// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator'

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type'

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'default',
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    {
      name: 'users',
      title: 'Users',
      type: 'document',
      fields: [
        {
          name: 'userName',
          title: 'User Name',
          type: 'string',
        },
        {
          name: 'walletAddress',
          title: 'Wallet Address',
          type: 'string',
        },
        {
          name: 'profileImage',
          title: 'Profile Image',
          type: 'image',
        },
        {
          name: 'bannerImage',
          title: 'Banner Image',
          type: 'image',
        },
        {
          name: 'twitterHandle',
          title: 'Twitter Handle',
          type: 'string',
        },
        {
          name: 'igHandle',
          title: 'Instagram Handle',
          type: 'string',
        },
      ],
    },
    {
      name: 'marketItems',
      title: 'Market Items',
      type: 'document',
      fields: [
        {
          name: 'title',
          title: 'Title',
          type: 'string',
        },
        {
          name: 'contractAddress',
          title: 'Contract Address',
          type: 'string',
        },
        {
          name: 'description',
          title: 'Description',
          type: 'string',
        },
        {
          name: 'createdBy',
          title: 'Created By',
          type: 'reference',
          to: [{ type: 'users' }],
        },
        {
          name: 'volumeTraded',
          title: 'Volume Traded',
          type: 'number',
        },
        {
          name: 'floorPrice',
          title: 'Floor Price',
          type: 'number',
        },
        {
          name: 'owners',
          title: 'Owners',
          type: 'array',
          of: [{ type: 'reference', to: [{ type: 'users' }] }],
        },
        {
          name: 'profileImage',
          title: 'Profile Image',
          type: 'image',
        },
        {
          name: 'bannerImage',
          title: 'Banner Image',
          type: 'image',
        },
      ],
    },
    {
      name: 'nfts',
      title: 'NFTs',
      type: 'document',
      fields: [
        { name: 'nftName', title: 'NFT Name', type: 'string' },
        { name: 'nftId', title: 'NFT ID', type: 'string' },
        { name: 'nftImage', title: 'NFT Image', type: 'string' },
        { name: 'nftDescription', title: 'NFT Description', type: 'string' },

        {
          name: 'nftOwner',
          title: 'NFT Owner',
          type: 'reference',
          to: [{ type: 'users' }],
        },
        {
          name: 'nftContractAddress',
          title: 'NFT Collection',
          type: 'string',
        },
      ],
    },
    {
      name: 'transactions',
      title: 'Transactions',
      type: 'document',
      fields: [
        {
          name: 'transactionId',
          title: 'Transaction ID',
          type: 'string',
        },
        {
          name: 'nftReference',
          title: 'NFT Reference',
          type: 'reference',
          to: [{ type: 'nfts' }],
        },
        {
          name: 'transactionType',
          title: 'Transaction Type',
          type: 'string',
        },
        {
          name: 'transactionAmount',
          title: 'Transaction Amount',
          type: 'string',
        },
        {
          name: 'transactionFrom',
          title: 'Transaction From',
          type: 'reference',
          to: [{ type: 'users' }],
        },
        {
          name: 'transactionTo',
          title: 'Transaction To',
          type: 'reference',
          to: [{ type: 'users' }],
        },
        {
          name: 'transactionDate',
          title: 'Transaction Date',
          type: 'datetime',
        },
      ],
    },
  ]),
})
