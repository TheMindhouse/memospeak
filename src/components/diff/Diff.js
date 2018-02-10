import React from 'react'

import {
  WordAdded,
  WordCorrect,
  WordMissing,
  WordPair
} from './words'

const diffObject = (value = '') => {
  return {
    text: value
  }
}

const Diff = ({ diff, modifyDiff }) => {
  const getCorrectDiffValue = (diffObj) => {
    const {
      add,
      remove
    } = diffObj

    if (add && remove) {
      return diffObject(remove)
    }
    if (add) {
      return diffObject()
    }
    if (remove) {
      return diffObject(remove)
    }
  }

  const markAsCorrect = (id) => {
    const diffObj = diff[id]
    if (!diffObj) {
      return
    }

    const value = getCorrectDiffValue(diffObj)

    modifyDiff({ id, value })
  }

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
        return <WordPair missing={remove} id={index} markAsCorrect={markAsCorrect} added={add} key={index} />
      }
      if (add) {
        return <WordAdded value={add} id={index} markAsCorrect={markAsCorrect} key={index} />
      }
      if (remove) {
        return <WordMissing value={remove} id={index} markAsCorrect={markAsCorrect} key={index} />
      }
    })
  }

  return (
    <div>
      {showDiff(diff, modifyDiff)}
    </div>
  )
}

export default Diff
