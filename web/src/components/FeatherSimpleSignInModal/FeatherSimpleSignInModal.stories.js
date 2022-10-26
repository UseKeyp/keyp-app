import FeatherSimpleSignInModal from './FeatherSignInModal'

export const desktop = () => {
  return (
    <div>
      <FeatherSimpleSignInModal
        discord={true}
        facebook={true}
        twitter={true}
        chess={true}
      />
    </div>
  )
}

export default { title: 'Components/FeatherSimpleSignInModal' }
