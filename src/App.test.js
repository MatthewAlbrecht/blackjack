import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import App from './App'

test('renders learn react link', () => {
  const { getByText } = render(<App />)
  const startButton = getByText(/start game/i)
  expect(startButton).toBeInTheDocument()
})
