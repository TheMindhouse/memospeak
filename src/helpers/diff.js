import { diffWordsWithSpace } from 'diff'

import { Word, WordChanged, TYPES } from './Words'

const containsAnyAlphanumericChars = (str) => {
  return str.match(/[A-Za-z0-9]/i)
}

const ignoreNonAlphabeticChars = (diff) => {
  return diff.map(part => {
    const { value } = part
    if (containsAnyAlphanumericChars(value)) {
      return part
    }
    return {
      ...part,
      ignored: true
    }
  })
}

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
const markAsChanged = (diff) => {
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

  return newDiff
}

const postProcess = (diff) => {
  const wordObjects = convertToWordObj(diff)

  const cleaned = markAsChanged(wordObjects)

  return cleaned
}

const diff = (oldString, newString) => {
  const bareDiff = diffWordsWithSpace(
    oldString,
    newString,
    {
      ignoreCase: true
    }
  )
  return postProcess(bareDiff)
}

export default diff
