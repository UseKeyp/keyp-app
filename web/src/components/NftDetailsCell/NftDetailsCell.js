import DetailsBox from 'src/components/DetailsBox/DetailsBox'

export const QUERY = gql`
  query NftDetailsQuery {
    nftDetails {
      owner
      creator
      title
      bids
      nftHistory
    }
  }
`

export const Loading = () => (
  <div className="details-wrapper">
    <h2 className="text-center text-5xl">NFT Details</h2>
    <br />
    <DetailsBox heading="Owner" />
    <br />
    <DetailsBox heading="Creator" />
    <br />
    <DetailsBox heading="Title" />
    <br />
    <DetailsBox heading="Bids" />
    <br />
    <DetailsBox heading="NFT History" />
  </div>
)

export const Empty = () => <div></div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ nftDetails }) => {
  const { owner, creator, title, bids, nftHistory } = nftDetails
  const bidsStrings = Object.entries(bids).map(([price, person], i) => (
    <span key={i} className={`${i === 0 ? 'text--green' : ''}`}>
      ${price} - {person}
    </span>
  ))

  return (
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
  )
}
