import { render } from '@redwoodjs/testing'

import UserDetails from './UserDetails'

describe('UserDetails', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<UserDetails />)
    }).not.toThrow()
  })
})
