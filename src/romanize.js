const {
  hangulPattern,
  splitPattern
} = require('./hangul/unicode/hangulPattern')
const { decomposeHangul } = require('./hangul/unicode/decompose')
const { syllableParser } = require('./syllableParser')
const isHangul = require('./hangul/isHangul')

/**
 * Transforms a given string by replacing each Hangul character-containing substring with romaja
 * @param {string} text
 * @param {Object} [options]
 * @param {boolean} [ruby]
 */
const romanize = (text, options = {}) => {
  if (options.ruby) {
    return text.split(splitPattern).map(str => {
      if (isHangul(str[0])) {
        return { text: romanizeWord(str), ruby: str }
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
function romanizeWord (word, options = {}) {
  const { method = 'RR', hyphenate = method === 'RRT' || undefined } = options

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

module.exports = { romanize, romanizeWord }
