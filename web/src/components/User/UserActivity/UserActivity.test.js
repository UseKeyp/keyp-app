import { render } from '@redwoodjs/testing'

import UserActivity from './UserActivity'

describe('UserActivity', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<UserActivity />)
    }).not.toThrow()
  })
})
