import { render } from '@redwoodjs/testing'

import CardsListWrapper from './CardsListWrapper'

describe('CardsListWrapper', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<CardsListWrapper />)
    }).not.toThrow()
  })
})
