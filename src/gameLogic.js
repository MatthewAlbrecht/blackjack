export const calculateScore = cards => {
  let aceCount = 0
  let score = cards
    .map(card => {
      switch (card.code.charAt(0)) {
        case 'A':
          aceCount += 1
          return 0
        case 'K':
          return 10
        case 'Q':
          return 10
        case 'J':
          return 10
        case '0':
          return 10

        default:
          return +card.code.charAt(0)
      }
    })
    .sort()
    .reduce((total, value, i) => {
      return (total += value)
    }, 0)

  // accounting for more than 1 ace
  // For example A -> A -> 10
  if (aceCount) {
    score += aceCount
    while (score <= 11) {
      score += 10
    }
  }

  return score
}

export const calculateGame = (houseScore, userScore) => {
  if (houseScore === 21) return false
  if (userScore > 21) return false
  if (houseScore >= userScore) return false
  return true
}
