import FeatherSignInModal from 'src/components/FeatherSignInModal/FeatherSignInModal'

const FeatherSignInPage = () => {
  return (
    <>
      <FeatherSignInModal
        discord={true}
        facebook={true}
        twitter={true}
        chess={true}
      />
    </>
  )
}

export default FeatherSignInPage
