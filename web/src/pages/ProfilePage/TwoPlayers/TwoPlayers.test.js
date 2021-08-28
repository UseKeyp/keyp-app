import { render } from '@redwoodjs/testing'

import TwoPlayers from './TwoPlayers'

describe('TwoPlayers', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<TwoPlayers />)
    }).not.toThrow()
  })
})
