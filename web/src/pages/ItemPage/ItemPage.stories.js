/* eslint-disable no-console */
import ItemPage from './ItemPage'
import {
  title,
  opening,
  movesList,
  bids,
  owner,
  creator,
  nftHistory,
  cardDetails,
} from './datamock'

const ACCEPT_HIGHEST_BID = 'accept highest bid'
const PUT_ON_SALE = 'put on sale'
const TRANSFER_NFT = 'transfer nft'

const handleClick = (id) => {
  if (id === ACCEPT_HIGHEST_BID) {
    console.log('Accepting highest bid...')
  } else if (id === PUT_ON_SALE) {
    console.log('Putting on sale...')
  } else if (id === TRANSFER_NFT) {
    console.log('Transfering NFT...')
  }
}

export const generated = () => {
  return (
    <ItemPage
      title={title}
      opening={opening}
      movesList={movesList}
      bids={bids}
      owner={owner}
      creator={creator}
      nftHistory={nftHistory}
      cardDetails={cardDetails}
      onClick={handleClick}
    />
  )
}

export default { title: 'Pages/ItemPage' }
