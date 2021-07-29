import MiniButton from './MiniButton'

export const generated = () => {
  return <MiniButton>Mint</MiniButton>
}

export const transfered = () => {
  return (
    <MiniButton variant="grey">
      <span style={{ fontSize: 36 }}>&#8594;</span>
    </MiniButton>
  )
}

export default { title: 'Components/MiniButton' }
