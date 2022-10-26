import { render } from '@redwoodjs/testing'

import FeatherSignInModal from './FeatherSignInModal'

describe('FeatherSignInModal', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<FeatherSignInModal />)
    }).not.toThrow()
  })
})
