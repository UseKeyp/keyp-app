import MovesDetails from './MovesDetails'

const title = 'Moves'
const movesList = [
  { move: 1, from: 'a3', to: 'b5' },
  { move: 2, from: 'Nf3', to: 'Bb7' },
  { move: 3, from: 'c4', to: 'bxc4' },
  { move: 4, from: 'Qa4', to: 'Bc6' },
  { move: 5, from: 'Qxc4', to: 'd5' },
]

export const generated = () => {
  return (
    <div style={{ maxWidth: 530 }}>
      <MovesDetails title={title} movesList={movesList} />
    </div>
  )
}

export default { title: 'Components/MovesDetails' }
