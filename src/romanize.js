import {
  hangulPattern,
  splitPattern
} from './hangul/unicode/hangulPattern.js'
import { decomposeHangul } from './hangul/unicode/decompose.js'
import { syllableParser } from './syllableParser.js'
import isHangul from './hangul/isHangul.js'
import { hanjaToHangul } from './hangul/hanjaToHangul.js'

/**
 * Transforms a given string by replacing each Hangul/Hanja character-containing substring with romaja
 * @param {string} text
 * @param {Object} [options]
 * @param {boolean} [options.ruby]
 * @param {string} [options.method]
 * @param {boolean} [options.hyphenate]
 * @param {boolean} [options.hanja]
 */
export const romanize = (text, options = {}) => {
  const processedText = options.hanja ? hanjaToHangul(text, options) : text

  if (options.ruby) {
    return processedText.split(splitPattern).map(str => {
      if (isHangul(str[0])) {
        return { text: romanizeWord(str, options), ruby: str }
      }
      return str
    })
  }
  return processedText.replace(hangulPattern, word =>
    romanizeWord(word, options)
  )
}

/**
 * Transform a Hangul encoded string to Roman equivalent
 * @param {string} word
 * @param {Object} options
 * @param {string} [options.method]
 * @param {boolean} [options.hyphenate]
 * @param {boolean} [options.hanja]
 */
export function romanizeWord(word, options = {}) {
  const {
    method = 'RR',
    hyphenate = method === 'RRT' || undefined,
    overrides,
    hanja
  } = options

  const processedWord = hanja ? hanjaToHangul(word, options) : word

  if (overrides) {
    const override =
      overrides instanceof Map
        ? overrides.get(processedWord)
        : overrides[processedWord]
    if (override !== undefined) return override
  }

  const mappedToRoman = decomposeHangul(processedWord)
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
