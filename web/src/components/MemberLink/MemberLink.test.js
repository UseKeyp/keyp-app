import { render } from '@redwoodjs/testing'

import MemberLink from './MemberLink'

describe('MemberLink', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<MemberLink />)
    }).not.toThrow()
  })
})
