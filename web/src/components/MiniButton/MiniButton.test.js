import { render } from '@redwoodjs/testing'

import MiniButton from './MiniButton'

describe('MiniButton', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<MiniButton />)
    }).not.toThrow()
  })
})
