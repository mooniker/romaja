const { SBase, NCount, TCount, SCount } = require('./constraints')

/**
 * Returns an integer division quotient (rounded down)
 *
 * @param {number} dividend
 * @param {number} divisor
 */
const intDiv = (dividend, divisor) => Math.floor(dividend / divisor)

/**
 *
 * @param {(string|number)} s
 */
function computeSIndex (s) {
  const SIndex = (typeof s === 'string' ? s.charCodeAt(0) : s) - SBase

  if (SIndex < 0 || SIndex >= SCount) {
    throw new Error(`Not a Hangul syllable: ${s}`)
  }

  return SIndex
}

/**
 *
 * @param {number} SIndex
 */
const computeLIndex = SIndex => intDiv(SIndex, NCount) // integer division rounded down

/**
 *
 * @param {number} SIndex
 */
const computeVIndex = SIndex => intDiv(SIndex % NCount, TCount)

/**
 *
 * @param {number} SIndex
 */
const computeTIndex = SIndex => SIndex % TCount

/**
 *
 * @param {number} SIndex
 */
const computeLVIndex = SIndex => (SIndex / TCount) * TCount

module.exports = {
  intDiv,
  computeSIndex,
  computeLIndex,
  computeVIndex,
  computeTIndex,
  computeLVIndex
}
