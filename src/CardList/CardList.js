import React from 'react'
import './CardList.css'

const CardList = ({ cards }) => {
  return (
    <ul className="cardList">
      {cards &&
        cards.map((card, i) => (
          <li key={i} className="cardList-item">
            <img
              className="cardList-image"
              src={card.images.png}
              alt={`${card.value} of ${card.suit}`}
            />
          </li>
        ))}
    </ul>
  )
}

export default CardList
