import React from 'react'

import {
  WordAdded,
  WordCorrect,
  WordMissing,
  WordPair
} from './words'

import { Word, TYPES } from '../../helpers/Words'

const Diff = ({ diff, modifyDiff }) => {
  const getCorrectDiffWord = (diffObj) => {
    switch (diffObj.type) {
      case TYPES.CHANGED:
        return new Word(diffObj.removed, TYPES.CORRECT)
      case TYPES.REMOVED:
        return new Word(diffObj.value, TYPES.CORRECT)
      case TYPES.ADDED:
        return null
    }
  }

  const markAsCorrect = (id) => {
    const diffObj = diff[id]
    if (!diffObj) {
      return
    }

    const correctWord = getCorrectDiffWord(diffObj)

    modifyDiff({ id, part: correctWord })
  }

  const showDiff = (diff = []) => {
    if (!diff) {
      return
    }
    return diff.map((part, index) => {
      switch (part.type) {
        case TYPES.CHANGED:
          return <WordPair missing={part.removed.trim()} added={part.added.trim()} id={index} markAsCorrect={markAsCorrect} key={index} />
        case TYPES.ADDED:
          return <WordAdded value={part.value.trim()} id={index} markAsCorrect={markAsCorrect} key={index} />
        case TYPES.REMOVED:
          return <WordMissing value={part.value.trim()} id={index} markAsCorrect={markAsCorrect} key={index} />
        case TYPES.CORRECT:
        case TYPES.IGNORED:
        default:
          return <WordCorrect value={part.value.trim()} key={index} />
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
