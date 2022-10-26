import { render } from '@redwoodjs/testing'

import AssetCard from './AssetCard'

describe('AssetCard', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AssetCard />)
    }).not.toThrow()
  })
})
