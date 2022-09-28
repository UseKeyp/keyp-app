import { render } from '@redwoodjs/testing/web'

import UserMintCredits from './UserMintCredits'

describe('UserMintCredits', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<UserMintCredits />)
    }).not.toThrow()
  })
})
