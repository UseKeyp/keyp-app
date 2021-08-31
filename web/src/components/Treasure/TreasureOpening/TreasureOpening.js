import DetailsBox from 'src/components/DetailsBox'

const TreasureOpening = ({ treasure }) => {
  if (!treasure) return <DetailsBox heading="Opening" />
  return <DetailsBox heading="Opening" items={[treasure.opening]} />
}

export default TreasureOpening
