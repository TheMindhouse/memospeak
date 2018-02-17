export const TYPES = {
  CORRECT: 'correct',
  REMOVED: 'removed',
  ADDED: 'added',
  CHANGED: 'changed',
  IGNORED: 'ignored'
}

class BaseWord {
  constructor (type) {
    this.type = type
  }
}

export class Word extends BaseWord {
  constructor (value, type) {
    super(type)
    this.value = value
    this.count = value.trim().split(/\s/).length
  }
}

export class WordChanged extends BaseWord {
  constructor (removed, added) {
    super(TYPES.CHANGED)
    this.removed = removed
    this.added = added
    this.count = removed.trim().split(/\s/).length
  }
}
