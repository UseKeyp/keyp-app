import { render } from '@redwoodjs/testing/web'

import LoadingScreen from './LoadingScreen'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('LoadingScreen', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<LoadingScreen />)
    }).not.toThrow()
  })
})
