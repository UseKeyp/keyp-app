import { render } from '@redwoodjs/testing'

import PrototypePage from './PrototypePage'

describe('PrototypePage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<PrototypePage />)
    }).not.toThrow()
  })
})
