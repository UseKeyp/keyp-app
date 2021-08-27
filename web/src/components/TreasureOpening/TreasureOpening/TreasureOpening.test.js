import { render } from '@redwoodjs/testing'

import TreasureOpening from './TreasureOpening'

describe('TreasureOpening', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<TreasureOpening />)
    }).not.toThrow()
  })
})
