import { render } from '@redwoodjs/testing'

import MobileNav from './MobileNav'

describe('MobileNav', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<MobileNav />)
    }).not.toThrow()
  })
})
