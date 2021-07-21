import { render } from '@redwoodjs/testing'

import Avatar from './Avatar'

describe('Avatar', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Avatar />)
    }).not.toThrow()
  })
})
