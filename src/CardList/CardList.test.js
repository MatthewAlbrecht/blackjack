import React from 'react'
import { render } from '@testing-library/react'
import CardList from './CardList'
import EXAMPLE_HAND from '../testHelper'

test('renders card images', () => {
  const { getByText, getByAltText } = render(<CardList cards={EXAMPLE_HAND} />)

  const Ace = getByAltText(/A of Hearts/i)
  const Ten = getByAltText(/10 of Spades/i)

  expect(Ace).toBeInTheDocument()
  expect(Ten).toBeInTheDocument()
})
