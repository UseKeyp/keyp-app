import { render } from '@redwoodjs/testing'

import AvailableConnections from './AvailableConnections'

describe('AvailableConnections', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AvailableConnections />)
    }).not.toThrow()
  })
})
