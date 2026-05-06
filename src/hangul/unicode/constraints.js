// Common constraints (based on the pseudocode provided in the Unicode spec)

const LCount = 19 // number of lead consonants in Hangul

// Number of LV_Syllables per each leading consonant
const VCount = 21 // i.e. number of vowels in Hangul

// Number of LVT_Syllables per each LV_Syllable
const TCount = 28 // ie. the number of letters in Hangul

// Number of precomposed Hangul syllables
const NCount = VCount * TCount

export default {
  // code point for the beginning of the range of precomposed Hangul syllables (U+AC00)
  SBase: 0xac00,

  // code point for the beginning of the range of leading consonants, which starts at 0x1100
  LBase: 0x1100,

  // code point for the beginning of the range of vowels, which starts at 0x1161
  VBase: 0x1161,

  // code point for the beginning of the range of trailing consonants, which starts at 0x11a8
  TBase: 0x11a7,

  LCount, // 19
  VCount, // 21
  TCount, // 28
  NCount, // 588

  // Total number of precomposed Hangul syllables (11172)
  SCount: LCount * NCount
}
