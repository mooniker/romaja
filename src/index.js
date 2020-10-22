const hangulPattern = require('./hangul/unicode/hangulPattern')
const { romanizeWord } = require('./romanize')

/**
 * Transforms a given string by replacing each Hangul character-containing substring with romaja
 * @param {string} text
 * @param {Object} [options]
 */
const romanize = (text, options) =>
  text.replace(hangulPattern, word => romanizeWord(word, options))

module.exports = romanize
