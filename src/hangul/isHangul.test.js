import isHangul from './isHangul.js'
import blocks from './unicode/blocks.js'

const {
  HANGUL_SYLLABLES,
  HANGUL_JAMO,
  HANGUL_COMPATIBILITY_JAMO,
  HANGUL_JAMO_EXTENDED_A,
  HANGUL_JAMO_EXTENDED_B
} = blocks

const describeTestBlock = (name, [start, end], inclusive = true) => {
  describe(name, () => {
    const chars = [
      String.fromCodePoint(start),
      String.fromCodePoint(end),
      String.fromCodePoint(Math.floor((start + end) / 2))
    ]

    chars.forEach(char => {
      test(`should determine ${char} is ${inclusive ? '' : 'not '}hangul`, () => {
        if (inclusive) {
          expect(isHangul(char)).toBeTruthy()
        } else {
          expect(isHangul(char)).toBe(false)
        }
      })
    })
  })
}

describe('isHangul', () => {
  describe('non-string input', () => {
    test('should return null', () => {
      expect(isHangul()).toBeNull()
    })
    test('should return null for null', () => {
      expect(isHangul(null)).toBeNull()
    })
    test('should return null for NaN', () => {
      expect(isHangul(NaN)).toBeNull()
    })
    test('should return null for object', () => {
      expect(isHangul({})).toBeNull()
    })
    test('should return null for number', () => {
      expect(isHangul(1945)).toBeNull()
    })
  })

  test('should return true for Hangul compatibility jamo', () => {
    expect(isHangul('ㄱ')).toBeTruthy()
  })

  test('should return true for Hangul jungseong', () => {
    expect(isHangul('ㅏ')).toBeTruthy()
  })

  test('should return true for Hangul syllable', () => {
    expect(isHangul('가')).toBeTruthy()
  })

  test('should return false for English letter', () => {
    expect(isHangul('A')).toBe(false)
  })

  test('should return false for Hanja', () => {
    expect(isHangul('韓')).toBe(false)
  })
})

describe('isHangul blocks', () => {
  describeTestBlock('Hangul syllables', HANGUL_SYLLABLES, true)
  describeTestBlock('Hangul jamo', HANGUL_JAMO, true)
  describeTestBlock('Hangul compatibility jamo', HANGUL_COMPATIBILITY_JAMO, true)
  describeTestBlock('Hangul jamo extended-A', HANGUL_JAMO_EXTENDED_A, true)
  describeTestBlock('Hangul jamo extended-B', HANGUL_JAMO_EXTENDED_B, true)
})
