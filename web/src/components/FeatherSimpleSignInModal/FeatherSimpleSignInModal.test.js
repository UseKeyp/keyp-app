import { render } from '@redwoodjs/testing'

import FeatherSimpleSignInModal from './FeatherSimpleSignInModal'

describe('FeatherSimpleSignInModal', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<FeatherSimpleSignInModal />)
    }).not.toThrow()
  })
})
