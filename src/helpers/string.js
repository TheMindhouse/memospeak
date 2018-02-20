/**
 * Returns true if string contains any alphanumeric chars A-Z, a-z or 0-9
 * @param str - string to check
 */
export const containsAnyAlphanumericChars = (str) => {
  return str.match(/[A-Za-z0-9]/i)
}

/**
 * Replace new lines with a space
 * @param str - string to modify
 */
export const removeLineBreaks = (str) => str.replace(/\r?\n|\r/g, ' ')