import { Link, routes } from '@redwoodjs/router'

const MemberPage = ({ memberHandle }) => {
  return (
    <>
      <h1>MemberPage</h1>
      <p>
        Find me in <code>./web/src/pages/MemberPage/MemberPage.js</code>
      </p>
      <p>
        My default route is named <code>member</code>, link to me with `
        <Link to={routes.member({ memberHandle: '42' })}>Member 42</Link>`
      </p>
      <p>The parameter passed to me is {memberHandle}</p>
    </>
  )
}

export default MemberPage
