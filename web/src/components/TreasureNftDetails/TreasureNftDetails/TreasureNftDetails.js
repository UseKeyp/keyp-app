import MemberLink from 'src/components/MemberLink'
import DetailsBox from 'src/components/DetailsBox'

const TreasureNftDetails = ({ treasureNftDetails }) => {
  const bidItems = treasureNftDetails.bids.map(({ price, bidder }, i) => {
    return (
      <span key={i} className={`${i === 0 ? 'text--green' : ''}`}>
        ${price} - <MemberLink id={bidder} />
      </span>
    )
  })

  return (
    <div className="details-wrapper">
      <h2 className="text-center text-5xl">NFT Details</h2>
      <br />
      <DetailsBox
        heading="Owner"
        items={[<MemberLink member={treasureNftDetails.owner} />]}
      />
      <br />
      <DetailsBox
        heading="Minter"
        items={[<MemberLink member={treasureNftDetails.minter} />]}
      />
      <br />
      <DetailsBox heading="Bids" items={bidItems} />
      <br />
      {/*
      <DetailsBox heading="NFT History" items={treasureNftDetails.history} />
      */}
    </div>
  )
}

export default TreasureNftDetails
