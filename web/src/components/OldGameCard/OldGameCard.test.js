import { render } from '@redwoodjs/testing'

import OldGameCard from './OldGameCard'

describe('OldGameCard', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<OldGameCard />)
    }).not.toThrow()
  })
})
