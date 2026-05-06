import constraints from './constraints.js'
import {
  computeSIndex,
  computeLIndex,
  computeVIndex,
  computeTIndex
} from './computations.js'

const { SBase, LBase, VBase, TBase } = constraints

/**
 * Based on "Arithmetic Decomposition Mapping" as described in Unicode core spec for "LV" Hangul syllable types
 *
 * (Unicode spec v.12.1.0, Sec 3.12, eq. D133)
 *
 * @param {string} s - a Hangul character
 * @returns {number[]} an array containing the code points for the decomposed Jamo
 */
export function arithmeticDecompositionMappingLV(s) {
  const SIndex = computeSIndex(s)
  const LIndex = computeLIndex(SIndex)
  const VIndex = computeVIndex(SIndex)

  const LPart = LBase + LIndex
  const VPart = VBase + VIndex

  return [LPart, VPart]
}

/**
 * Based on "Arithmetic Decomposition Mapping" as described in Unicode core spec for "LVT" Hangul syllable types
 *
 * (Unicode spec v.12.1.0, Sec 3.12, eq. D134)
 *
 * @param {string} s - a Hangul character
 * @returns {number[]} an array containing the code points for the decomposed Jamo
 */
export function arithmeticDecompositionMappingLVT(s) {
  const SIndex = computeSIndex(s)
  const TIndex = computeTIndex(SIndex)
  const LVIndex = (SIndex / constraints.TCount) * constraints.TCount

  const LVPart = SBase + LVIndex
  const TPart = TBase + TIndex

  return [...arithmeticDecompositionMappingLV(LVPart), TPart]
}

/**
 * Derives a canonical decomposition of a precomposed/composite Hangul syllable
 *
 * @param {string|number} s - a Hangul character or a code point for a Hangul character
 * @returns {number[]} an array containing the code points for the decomposed Jamo
 */
export function decomposeHangulChar(s) {
  const SIndex = computeSIndex(s)
  const TIndex = computeTIndex(SIndex)

  if (TIndex !== 0) {
    return arithmeticDecompositionMappingLVT(s)
  }

  return arithmeticDecompositionMappingLV(s)
}

/**
 * Returns a mapping of each Hangul character provided to an array of code points for the decomposed letters (jamo)
 *
 * @param {string} word
 * @returns {number[][]}
 */
export const decomposeHangul = word => [...word].map(decomposeHangulChar)
