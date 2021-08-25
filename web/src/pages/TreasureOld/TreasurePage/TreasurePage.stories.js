/* eslint-disable no-console */
import TreasurePage from './TreasurePage'

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
  return <TreasurePage onClick={handleClick} matchId={42} />
}

export default { title: 'Pages/TreasurePage' }
