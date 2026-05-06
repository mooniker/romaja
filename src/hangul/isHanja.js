import blocks from './unicode/blocks.js'

const { CJK_UNIFIED_IDEOGRAPHS } = blocks

/**
 * Check whether a provided character is a Hanja (CJK Unified Ideograph).
 * @param {string} char
 * @returns {boolean}
 */
const isHanja = char => {
  if (typeof char !== 'string' || char.length === 0) {
    return false
  }

  const codePoint = char.codePointAt(0)
  const [start, end] = CJK_UNIFIED_IDEOGRAPHS

  return codePoint >= start && codePoint <= end
}

export default isHanja
