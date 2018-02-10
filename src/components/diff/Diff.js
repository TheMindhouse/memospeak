import React from 'react'

import {
  WordAdded,
  WordCorrect,
  WordMissing,
  WordPair
} from './words'

const showDiff = (diff = []) => {
  if (!diff) {
    return
  }
  return diff.map((part, index) => {
    const {
      text,
      add,
      remove
    } = part

    if (text) {
      return <WordCorrect value={text} key={index} />
    }
    if (add && remove) {
      return <WordPair missing={remove} added={add} key={index} />
    }
    if (add) {
      return <WordAdded value={add} key={index} />
    }
    if (remove) {
      return <WordMissing value={remove} key={index} />
    }
  })
}

const Diff = ({ diff }) => {
  return (
    <div>
      {showDiff(diff)}
    </div>
  )
}

export default Diff
