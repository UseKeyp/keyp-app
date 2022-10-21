import { render } from '@redwoodjs/testing/web'

import Dashboard from './Dashboard'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Dashboard', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Dashboard />)
    }).not.toThrow()
  })
})
