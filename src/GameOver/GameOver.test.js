import React from 'react'
import { render } from '@testing-library/react'
import GameOver from './GameOver'

test('renders header and subheader', () => {
  const { getByText } = render(<GameOver userWon={true} />)
  const header = getByText(/YOU WON!/i)
  const subHeader = getByText(/click/i)
  expect(header).toBeInTheDocument()
  expect(subHeader).toBeInTheDocument()
})
