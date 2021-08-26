import { render } from '@redwoodjs/testing'

import Games from './Games'

describe('Games', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Games />)
    }).not.toThrow()
  })
})
