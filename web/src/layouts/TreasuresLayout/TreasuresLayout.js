import { Link, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'

const TreasuresLayout = (props) => {
  return (
    <div className="rw-scaffold">
      <Toaster />
      <header className="rw-header">
        <h1 className="rw-heading rw-heading-primary">
          <Link to={routes.treasures()} className="rw-link">
            Treasures
          </Link>
        </h1>
        <Link to={routes.newTreasure()} className="rw-button rw-button-green">
          <div className="rw-button-icon">+</div> New Treasure
        </Link>
      </header>
      <main className="rw-main">{props.children}</main>
    </div>
  )
}

export default TreasuresLayout
