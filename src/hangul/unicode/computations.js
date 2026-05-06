import constraints from './constraints.js'

const { SBase, NCount, TCount, SCount } = constraints

/**
 * Returns an integer division quotient (rounded down)
 *
 * @param {number} dividend
 * @param {number} divisor
 */
export const intDiv = (dividend, divisor) => Math.floor(dividend / divisor)

/**
 * Computes SIndex for a given Hangul syllable
 * (Unicode spec v.12.1.0, Sec 3.12, eq. D132)
 *
 * @param {string} s - a Hangul syllable
 * @returns {number}
 */
export const computeSIndex = s => {
  if (typeof s === 'string') {
    s = s.codePointAt(0)
  }

  const SIndex = s - SBase

  if (SIndex < 0 || SIndex >= SCount) {
    throw new Error(`Not a Hangul syllable: ${s}`)
  }

  return SIndex
}

/**
 *
 * @param {number} SIndex
 */
export const computeLIndex = SIndex => intDiv(SIndex, NCount)

/**
 *
 * @param {number} SIndex
 */
export const computeVIndex = SIndex => intDiv(SIndex % NCount, TCount)

/**
 *
 * @param {number} SIndex
 */
export const computeTIndex = SIndex => SIndex % TCount

/**
 *
 * @param {number} SIndex
 */
export const computeLVIndex = SIndex => (SIndex / TCount) * TCount
