import React from 'react'
import CardList from '../CardList/CardList'
import './BoardState.css'

const BoardState = ({ name, cards, score, children }) => {
  return (
    <div className="boardState">
      <h3 className="boardState-name">{name}</h3>
      <h4 className="boardState-score">Score: {score}</h4>
      <CardList cards={cards} />
      {children}
    </div>
  )
}

export default BoardState
