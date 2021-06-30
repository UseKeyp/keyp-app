import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'
import TreasureForm from 'src/components/Treasure/TreasureForm'

export const QUERY = gql`
  query FindTreasureById($id: Int!) {
    treasure: treasure(id: $id) {
      id
      createdAt
      updatedAt
    }
  }
`
const UPDATE_TREASURE_MUTATION = gql`
  mutation UpdateTreasureMutation($id: Int!, $input: UpdateTreasureInput!) {
    updateTreasure(id: $id, input: $input) {
      id
      createdAt
      updatedAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Success = ({ treasure }) => {
  const [updateTreasure, { loading, error }] = useMutation(
    UPDATE_TREASURE_MUTATION,
    {
      onCompleted: () => {
        toast.success('Treasure updated')
        navigate(routes.treasures())
      },
    }
  )

  const onSave = (input, id) => {
    updateTreasure({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Treasure {treasure.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <TreasureForm
          treasure={treasure}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
