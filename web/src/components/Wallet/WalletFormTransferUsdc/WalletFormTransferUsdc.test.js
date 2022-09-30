import { render } from '@redwoodjs/testing/web'

import WalletFormTransferUsdc from './WalletFormTransferUsdc'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('WalletFormTransferUsdc', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<WalletFormTransferUsdc />)
    }).not.toThrow()
  })
})
