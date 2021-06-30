import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { Link, routes } from '@redwoodjs/router'

import { QUERY } from 'src/components/Treasure/TreasuresCell'

const DELETE_TREASURE_MUTATION = gql`
  mutation DeleteTreasureMutation($id: Int!) {
    deleteTreasure(id: $id) {
      id
    }
  }
`

const MAX_STRING_LENGTH = 150

const truncate = (text) => {
  let output = text
  if (text && text.length > MAX_STRING_LENGTH) {
    output = output.substring(0, MAX_STRING_LENGTH) + '...'
  }
  return output
}

const jsonTruncate = (obj) => {
  return truncate(JSON.stringify(obj, null, 2))
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

const TreasuresList = ({ treasures }) => {
  const [deleteTreasure] = useMutation(DELETE_TREASURE_MUTATION, {
    onCompleted: () => {
      toast.success('Treasure deleted')
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete treasure ' + id + '?')) {
      deleteTreasure({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Created at</th>
            <th>Updated at</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {treasures.map((treasure) => (
            <tr key={treasure.id}>
              <td>{truncate(treasure.id)}</td>
              <td>{timeTag(treasure.createdAt)}</td>
              <td>{timeTag(treasure.updatedAt)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.treasure({ id: treasure.id })}
                    title={'Show treasure ' + treasure.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editTreasure({ id: treasure.id })}
                    title={'Edit treasure ' + treasure.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <a
                    href="#"
                    title={'Delete treasure ' + treasure.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(treasure.id)}
                  >
                    Delete
                  </a>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TreasuresList
