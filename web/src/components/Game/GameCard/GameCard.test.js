import { render } from '@redwoodjs/testing'

import GameCard from './GameCard'

describe('GameCard', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<GameCard />)
    }).not.toThrow()
  })
})
