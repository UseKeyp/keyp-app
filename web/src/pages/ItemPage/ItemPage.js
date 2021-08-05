import DetailsBox from 'src/components/DetailsBox/DetailsBox'
import MovesDetails from 'src/components/MovesDetails/MovesDetails'
import GameCard from 'src/components/GameCard/GameCard'
import Button from 'src/components/Button/Button'

const ACCEPT_HIGHEST_BID = 'accept highest bid'
const PUT_ON_SALE = 'put on sale'
const TRANSFER_NFT = 'transfer nft'

const ItemPage = ({
  opening,
  movesList,
  owner,
  creator,
  title,
  bids,
  nftHistory,
  cardDetails,
  onClick,
}) => {
  const bidsStrings = Object.entries(bids).map(([price, person], i) => (
    <span key={i} className={`${i === 0 ? 'text--green' : ''}`}>
      ${price} - {person}
    </span>
  ))

  return (
    <div className="item-page max-width-container">
      <div className="grid grid-rows-1">
        <div className="grid md:grid-cols-3 grid-cols-1 gap-10">
          <div className="flex justify-center items-start order-2 md:order-1">
            <div className="details-wrapper">
              <h2 className="text-center text-5xl">Match Details</h2>
              <br />
              <DetailsBox heading="Opening" items={[opening]} />
              <br />
              <MovesDetails heading="Moves" movesList={movesList} />
            </div>
          </div>
          <div className="flex flex-col justify-start items-center order-1 md:order-2">
            <GameCard {...cardDetails} />
            <div className="buttons-wrapper w-full flex flex-wrap justify-center">
              <Button
                onClick={() => onClick(ACCEPT_HIGHEST_BID)}
                variant="green"
              >
                Accept Highest Bid
              </Button>
              <Button onClick={() => onClick(PUT_ON_SALE)} variant="gold">
                Put On Sale
              </Button>
              <Button onClick={() => onClick(TRANSFER_NFT)} variant="grey">
                Transfer NFT
              </Button>
            </div>
          </div>
          <div className="flex justify-center items-start order-3">
            <div className="details-wrapper">
              <h2 className="text-center text-5xl">NFT Details</h2>
              <br />
              <DetailsBox heading="Owner" items={[owner]} />
              <br />
              <DetailsBox heading="Creator" items={[creator]} />
              <br />
              <DetailsBox heading="Title" items={[title]} />
              <br />
              <DetailsBox heading="Bids" items={bidsStrings} />
              <br />
              <DetailsBox heading="NFT History" items={nftHistory} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ItemPage
