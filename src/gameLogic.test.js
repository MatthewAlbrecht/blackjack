import React from 'react'
import { calculateGame, calculateScore } from './gameLogic'

test('calculating if user won', () => {
  expect(calculateGame(21, 21)).toEqual(false)
  expect(calculateGame(20, 21)).toEqual(true)
  expect(calculateGame(20, 24)).toEqual(false)
  expect(calculateGame(2, 3)).toEqual(true)
})

test('calculating score', () => {
  const userCards = [{ code: 'A' }, { code: 'A' }]
  expect(calculateScore(userCards)).toEqual(12)
  userCards.push({ code: '0' })
  expect(calculateScore(userCards)).toEqual(12)
  userCards.push({ code: '7' })
  expect(calculateScore(userCards)).toEqual(19)

  const houseCards = [{ code: '5' }, { code: '8' }]
  expect(calculateScore(houseCards)).toEqual(13)
  houseCards.push({ code: 'A' })
  expect(calculateScore(houseCards)).toEqual(14)
  houseCards.push({ code: '5' })
  expect(calculateScore(houseCards)).toEqual(19)
})
