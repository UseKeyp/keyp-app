import { render } from '@redwoodjs/testing'

import TreasureMoves from './TreasureMoves'

describe('TreasureMoves', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<TreasureMoves />)
    }).not.toThrow()
  })
})
