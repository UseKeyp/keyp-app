import { MetaTags } from '@redwoodjs/web'

import Redirect from 'src/components/Redirect'

const RedirectPage = ({ type }) => {
  return (
    <>
      <MetaTags title="Redirect" />
      <Redirect type={type} />
    </>
  )
}

export default RedirectPage
