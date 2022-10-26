import FeatherSignInModal from './FeatherSignInModal'

export const desktop = () => {
  return (
    <div>
      <FeatherSignInModal
        discord={true}
        facebook={true}
        twitter={true}
        chess={true}
      />
    </div>
  )
}

export default { title: 'Components/FeatherSignInModal' }
