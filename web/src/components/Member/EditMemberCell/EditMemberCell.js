import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'
import MemberForm from 'src/components/Member/MemberForm'

export const QUERY = gql`
  query FindMemberById($id: Int!) {
    member: member(id: $id) {
      id
      handle
    }
  }
`
const UPDATE_MEMBER_MUTATION = gql`
  mutation UpdateMemberMutation($id: Int!, $input: UpdateMemberInput!) {
    updateMember(id: $id, input: $input) {
      id
      handle
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Success = ({ member }) => {
  const [updateMember, { loading, error }] = useMutation(
    UPDATE_MEMBER_MUTATION,
    {
      onCompleted: () => {
        toast.success('Member updated')
        navigate(routes.members())
      },
    }
  )

  const onSave = (input, id) => {
    updateMember({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Member {member.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <MemberForm
          member={member}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
