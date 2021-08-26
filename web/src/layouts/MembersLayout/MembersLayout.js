import { Link, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'

const MembersLayout = (props) => {
  return (
    <div className="">
      <main className="rw-main">{props.children}</main>
    </div>
  )
}

export default MembersLayout
