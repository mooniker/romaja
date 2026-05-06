import {
  hangulPattern,
  splitPattern
} from './hangul/unicode/hangulPattern.js'
import { decomposeHangul } from './hangul/unicode/decompose.js'
import { syllableParser } from './syllableParser.js'
import isHangul from './hangul/isHangul.js'

/**
 * Transforms a given string by replacing each Hangul character-containing substring with romaja
 * @param {string} text
 * @param {Object} [options]
 * @param {boolean} [options.ruby]
 * @param {string} [options.method]
 * @param {boolean} [options.hyphenate]
 */
export const romanize = (text, options = {}) => {
  if (options.ruby) {
    return text.split(splitPattern).map(str => {
      if (isHangul(str[0])) {
        return { text: romanizeWord(str, options), ruby: str }
      }
      return str
    })
  }
  return text.replace(hangulPattern, word => romanizeWord(word, options))
}

/**
 * Transform a Hangul encoded string to Roman equivalent
 * @param {string} word
 * @param {Object} options
 * @param {string} [options.method]
 * @param {boolean} [options.hyphenate]
 */
export function romanizeWord(word, options = {}) {
  const {
    method = 'RR',
    hyphenate = method === 'RRT' || undefined,
    overrides
  } = options

  if (overrides) {
    const override =
      overrides instanceof Map ? overrides.get(word) : overrides[word]
    if (override !== undefined) return override
  }

  const mappedToRoman = decomposeHangul(word)
    .map(syllableParser(method))
    .reduce(
      (prevSyllables, currentSyllable) =>
        prevSyllables.concat(
          hyphenate ? [...currentSyllable, '-'] : currentSyllable
        ),
      []
    )
    .join('')
    .replace('--', '-')

  return hyphenate === false
    ? mappedToRoman.replace('-', '')
    : mappedToRoman.replace(/-$/, '')
}
