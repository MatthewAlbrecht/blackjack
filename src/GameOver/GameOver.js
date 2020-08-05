import React from 'react'
import './GameOver.css'

const GameOver = ({ userWon, newGame }) => {
  return (
    <div className="gameOver" onClick={newGame}>
      <h2 className="gameOver-heading">{userWon ? 'YOU WON!' : 'YOU LOST!'}</h2>
      <p className="gameOver-subHeading">Click to play again</p>
    </div>
  )
}

export default GameOver
