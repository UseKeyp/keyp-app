import { render } from '@redwoodjs/testing'

import MemberPage from './MemberPage'

describe('MemberPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<MemberPage memberHandle="42" />)
    }).not.toThrow()
  })
})
