import React from 'react'
import { render } from '@testing-library/react'
import BoardState from './BoardState'
import EXAMPLE_HAND from '../testHelper'

test('renders name, score, and children', () => {
  const { getByText } = render(
    <BoardState
      name="Bob"
      score={10}
      children={<span>test span</span>}
      cards={EXAMPLE_HAND}
    />
  )
  const nameLabel = getByText(/bob/i)
  const scoreLabel = getByText(/10/i)
  const children = getByText(/test span/i)
  expect(nameLabel).toBeInTheDocument()
  expect(scoreLabel).toBeInTheDocument()
  expect(children).toBeInTheDocument()
})
