import React, { useEffect, useState, useCallback } from 'react'
import { calculateScore, calculateGame } from './gameLogic'
import GameOver from './GameOver/GameOver'
import BoardState from './BoardState/BoardState'
import './App.css'
const NEW_DECK = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6'
const DRAW_N_CARDS = (id = 'new', n = 1) =>
  `https://deckofcardsapi.com/api/deck/${id}/draw/?count=${n}`

/**
  If I had more time I may break these requests out into a few custom hooks
  Imagining something like: 
  const [deck, shuffle, drawCards] = useDeck()
*/

function App() {
  const [deckId, setDeckId] = useState()
  const [deckLoading, setDeckLoading] = useState(false)
  const [houseHand, setHouseHand] = useState()
  const [userHand, setUserHand] = useState()
  const [houseScore, setHouseScore] = useState(0)
  const [userScore, setUserScore] = useState(0)
  const [userWon, setUserWon] = useState(null)

  const fetchDeck = useCallback(async () => {
    setDeckLoading(true)

    try {
      let response = await fetch(NEW_DECK)
      response = await response.json()
      setDeckId(response.deck_id)
      setDeckLoading(false)
    } catch (error) {
      console.error(error)
      setDeckLoading(false)
    }
  }, [])

  useEffect(() => {
    if (userScore > 21) {
      setUserWon(false)
    }
  }, [userScore])

  useEffect(() => {
    fetchDeck()
  }, [fetchDeck])

  const startGame = async () => {
    try {
      const response = await fetch(DRAW_N_CARDS(deckId, 4)).then(res =>
        res.json()
      )

      const newHouseHand = response.cards.slice(0, 2)
      const newUserHand = response.cards.slice(2)

      setHouseHand(newHouseHand)
      setHouseScore(calculateScore(newHouseHand))
      setUserHand(newUserHand)
      setUserScore(calculateScore(newUserHand))
    } catch (error) {
      console.error(error)
    }
  }

  const handleUserHit = async () => {
    try {
      let response = await fetch(DRAW_N_CARDS(deckId, 1))
      response = await response.json()

      const newUserHand = [...userHand, ...response.cards]

      setUserHand(newUserHand)
      setUserScore(calculateScore(newUserHand))
    } catch (error) {
      console.error(error)
    }
  }
  const handleUserStay = () => {
    const didUserWin = calculateGame(houseScore, userScore)

    setUserWon(didUserWin)
  }

  const newGame = () => {
    setDeckId()
    setDeckLoading(false)
    setHouseHand()
    setUserHand()
    setHouseScore(0)
    setUserScore(0)
    setUserWon(null)
  }

  return (
    <div className="App">
      {userWon !== null && <GameOver userWon={userWon} newGame={newGame} />}
      <header className="App-header">
        {!houseHand && !userHand && (
          <button
            className="btn"
            onClick={startGame}
            disable={deckLoading.toString()}
          >
            Start Game
          </button>
        )}
        {houseHand && (
          <BoardState
            cards={houseHand}
            score={houseScore}
            name="House"
          ></BoardState>
        )}
        {userHand && (
          <BoardState cards={userHand} score={userScore} name="User">
            <div className="boardState-btnGroup">
              <button className="btn" onClick={handleUserHit}>
                Hit
              </button>
              <button className="btn" onClick={handleUserStay}>
                Stay
              </button>
            </div>
          </BoardState>
        )}
      </header>
    </div>
  )
}

export default App
