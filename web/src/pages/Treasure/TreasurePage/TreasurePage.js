import TreasureCell from 'src/components/Treasure/TreasureCell'
import TreasureOpeningCell from 'src/components/TreasureOpeningCell'
import TreasureMovesCell from 'src/components/TreasureMovesCell'

const TreasurePage = ({ id }) => {
  return (
    <div className="item-page max-width-container">
      <div className="grid grid-rows-1">
        <div className="grid md:grid-cols-3 grid-cols-1 gap-10">
          <div className="flex justify-center items-start order-2 md:order-1">
            <div className="details-wrapper">
              <h2 className="text-center text-5xl">Game Details</h2>
              <br />
              <TreasureOpeningCell id={id} />
              <br />
              <TreasureMovesCell id={id} />
            </div>
          </div>
          <div className="flex flex-col justify-start items-center order-1 md:order-2">
            <GameCardCell id={id} />
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
            <NftDetailsCell id={id} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default TreasurePage
