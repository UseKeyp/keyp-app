import { render } from '@redwoodjs/testing/web'

import UserBalance from './UserBalance'

describe('UserBalance', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<UserBalance />)
    }).not.toThrow()
  })
})
