import { render } from '@redwoodjs/testing'

import MovesDetails from './MovesDetails'

describe('MovesDetails', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<MovesDetails />)
    }).not.toThrow()
  })
})
