import { render } from '@redwoodjs/testing'

import ItemPage from './ItemPage'

describe('ItemPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ItemPage />)
    }).not.toThrow()
  })
})
