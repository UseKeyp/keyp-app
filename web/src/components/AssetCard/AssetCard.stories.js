import AssetCard from './AssetCard'

export const desktop = () => {
  return (
    <div>
      <AssetCard
        asset="Chess coin"
        src="/icons/WK.svg"
        balance="500"
        acronym="CC"
        description="Chess coin is an ERC20 token brought to you by Magnus Carlsen"
      />
    </div>
  )
}

export default { title: 'Components/AssetCard' }
