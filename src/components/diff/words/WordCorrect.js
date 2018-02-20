import React from 'react'

const WordCorrect = ({ value }) => {
  if (!value) {
    return null
  }
  return (
    <span>{value}&nbsp;</span>
  )
}

export default WordCorrect
