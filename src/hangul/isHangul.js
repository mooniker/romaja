const unicodeBlocks = require('./unicode/blocks')
const hangulBlocks = Object.entries(unicodeBlocks).filter(([blockName]) =>
  blockName.startsWith('HANGUL')
)

/**
 * Check whether a provided character belongs to a Hangul Unicode block.
 * @param {string} char
 * @param {Object} blocks
 * @returns {null|string|false}
 */
const isHangul = (char, blocks = hangulBlocks) => {
  if (typeof char !== 'string') {
    return null
  }

  const codePoint = char.codePointAt(0)

  for (const [block, [start, end]] of blocks) {
    if (codePoint >= start && codePoint <= end) {
      return block
    }
  }
  return false
}

module.exports = isHangul
