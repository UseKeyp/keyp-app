import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'
import TreasureForm from 'src/components/Treasure/TreasureForm'

const CREATE_TREASURE_MUTATION = gql`
  mutation CreateTreasureMutation($input: CreateTreasureInput!) {
    createTreasure(input: $input) {
      id
    }
  }
`

const NewTreasure = () => {
  const [createTreasure, { loading, error }] = useMutation(
    CREATE_TREASURE_MUTATION,
    {
      onCompleted: () => {
        toast.success('Treasure created')
        navigate(routes.treasures())
      },
    }
  )

  const onSave = (input) => {
    const castInput = Object.assign(input, { tokenId: parseInt(input.tokenId) })
    createTreasure({ variables: { input: castInput } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Treasure</h2>
      </header>
      <div className="rw-segment-main">
        <TreasureForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewTreasure
