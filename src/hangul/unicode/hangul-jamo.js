const getUnicodeDataFor = require('./getData')

const { LBase, LCount, VBase, VCount, TBase, TCount } = require('./constraints')

// totals including archaic jamo
const LTotal = 90 // initial consonants
const VTotal = 4 * 16 + 2 // medial vowels
const TTotal = 8 * 10 + 3 // final consonants

/**
 * Produces an array of objects for each jamo for given range
 * @param {number} offset
 * @param {number} numCurrent
 * @param {number} numTotal
 * @returns {Object[]}
 */
const indexJamo = (offset, numCurrent, numTotal) =>
  Array(numTotal || numCurrent)
    .fill({})
    .map((p, idx) => {
      const codePoint = offset + idx
      const unicodeData = getUnicodeDataFor(codePoint)

      return {
        jamo: String.fromCodePoint(codePoint),
        archaic: idx + 1 > numCurrent,
        unicodeData
      }
    })

module.exports = [
  // initial consonants
  indexJamo(LBase, LCount, LTotal),
  // medial vowels
  indexJamo(VBase, VCount, VTotal),
  // final consonants
  indexJamo(TBase, TCount, TTotal)
]
