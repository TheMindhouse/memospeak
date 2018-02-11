import XRegExp from 'xregexp';

const ONE_AND_MORE_WHITESPACES = /\s+/g;
const SINGLE_SPACE = ' ';
const reduceWhitespaces = (str) =>
  str.replace(
    ONE_AND_MORE_WHITESPACES,
    SINGLE_SPACE,
  );

const NEITHER_LETTER_NOR_SPACE_NOR_NUMBER = XRegExp(
  '[^\\pL\\s0-9]+', 'g'
);
const EMPTY_STRING = '';
const removeSpecialCharacters = (str) =>
  XRegExp.replace(str,
    NEITHER_LETTER_NOR_SPACE_NOR_NUMBER,
    EMPTY_STRING,
  );

const trim = (str) => str.trim();

const toLowerCase = (str) => str.toLowerCase();

const compose = (...fns) =>
  fns.reduce((f, g) => (...args) => f(g(...args)));

const clean = compose(
  reduceWhitespaces,
  trim,
  removeSpecialCharacters,
  toLowerCase,
);

export default clean;
