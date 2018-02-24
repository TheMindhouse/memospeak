import { diffWordsWithSpace } from 'diff'

import { Word, WordChanged, TYPES } from './Words'

import {
  containsAnyAlphanumericChars,
  removeLineBreaks
} from './string'

/**
 * Converts diff original objects to Word objects, so we can display them properly later
 *
 * @param diff - original diff array from 'diff' package
 * @return {Array} - modified diff array with custom Word objects
 */
const convertToWordObj = diff =>
  diff.map((part) => {
    const {
      value,
      added,
      removed
    } = part

    if (!containsAnyAlphanumericChars(value)) {
      return new Word(value, TYPES.IGNORED)
    }

    if (!added && !removed) {
      return new Word(value, TYPES.CORRECT)
    }

    if (added) {
      return new Word(value, TYPES.ADDED)
    }

    if (removed) {
      return new Word(value, TYPES.REMOVED)
    }

    return null
  })

/**
 * This function goes through each element of diff array and combines together all
 * parts, which has been changed. By changed I mean removed parts directly followed by added part.
 * If a part was only removed and there is nothing added after it, it stays marked as removed.
 *
 * Examples:
 *
 * Original: A beautiful cat
 * Transcript: A nice cat
 * Word "beautiful" has been removed but word "nice" has been added instead.
 * These words will be connected together into a WordChanged object.
 *
 * Original: A beautiful cat
 * Transcript: A cat
 * Word "beautiful" has been removed but there is no other added word following it.
 * It will stay in the diff as Removed.
 *
 * @param diff
 * @return {Array} - transformed diff with WordChanged objects
 */
const combineWhenChanged = (diff) => {
  const newDiff = []

  let tempChanged = null

  for (let i = 0; i < diff.length; i++) {
    const current = diff[i]

    if (tempChanged) {
      if ([TYPES.ADDED, TYPES.IGNORED].includes(current.type)) {
        const removed = tempChanged.removed || tempChanged.value
        const added = tempChanged.added
          ? tempChanged.added + current.value
          : current.value

        tempChanged = new WordChanged(removed, added)

        continue
      } else {
        newDiff.push(tempChanged)
        tempChanged = null
      }
    }

    if (current.type === TYPES.REMOVED) {
      tempChanged = current
      continue
    }

    newDiff.push(current)
  }

  if (tempChanged) {
    newDiff.push(tempChanged)
  }

  return newDiff
}

/**
 * Handle post-processing of a diff. This is needed because 'diff' package doesn't return
 * the diff exactly as we want to. We need to combine results into Word objects
 * and combine removed/added word pairs into one object.
 *
 * @param diff - original diff array from 'diff' package
 * @return {Array} - diff modified for use in the App
 */
const postProcess = (diff) => {
  const wordObjects = convertToWordObj(diff)

  const cleaned = combineWhenChanged(wordObjects)

  return cleaned
}

/**
 * Main function to get a diff between two strings.
 * Uses 'diff' package and later does some post-processing to prepare results for the app.
 *
 * @param oldString - original text
 * @param newString - record transcript
 * @return {Array} - array with Word or WordChanged objects
 */
const diff = (oldString, newString) => {
  const bareDiff = diffWordsWithSpace(
    removeLineBreaks(oldString),
    newString,
    {
      ignoreCase: true
    }
  )
  return postProcess(bareDiff)
}

export default diff
