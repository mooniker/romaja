const { decomposeHangul } = require('./hangul/unicode/decompose')
const { syllableParser } = require('./syllableParser')

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

module.exports = { romanizeWord }
