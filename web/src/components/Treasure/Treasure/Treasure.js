import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { Link, routes, navigate } from '@redwoodjs/router'

const DELETE_TREASURE_MUTATION = gql`
  mutation DeleteTreasureMutation($id: Int!) {
    deleteTreasure(id: $id) {
      id
    }
  }
`

const jsonDisplay = (obj) => {
  return (
    <pre>
      <code>{JSON.stringify(obj, null, 2)}</code>
    </pre>
  )
}

const timeTag = (datetime) => {
  return (
    <time dateTime={datetime} title={datetime}>
      {new Date(datetime).toUTCString()}
    </time>
  )
}

const checkboxInputTag = (checked) => {
  return <input type="checkbox" checked={checked} disabled />
}

const Treasure = ({ treasure }) => {
  const [deleteTreasure] = useMutation(DELETE_TREASURE_MUTATION, {
    onCompleted: () => {
      toast.success('Treasure deleted')
      navigate(routes.treasures())
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete treasure ' + id + '?')) {
      deleteTreasure({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Treasure {treasure.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{treasure.id}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(treasure.createdAt)}</td>
            </tr>
            <tr>
              <th>Updated at</th>
              <td>{timeTag(treasure.updatedAt)}</td>
            </tr>
            <tr>
              <th>Name</th>
              <td>{treasure.name}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editTreasure({ id: treasure.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <a
          href="#"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(treasure.id)}
        >
          Delete
        </a>
      </nav>
    </>
  )
}

export default Treasure
