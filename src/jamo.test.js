import jamos from './jamo.js'

describe('Jamo data', () => {
  test('choseong should have 19 items', () => {
    expect(jamos[0]).toHaveLength(19)
  })

  test('jungseong should have 21 items', () => {
    expect(jamos[1]).toHaveLength(21)
  })

  test('jongseong should have 28 items (including null)', () => {
    expect(jamos[2]).toHaveLength(28)
  })

  test('jamoToCompat should be a Map', () => {
    expect(jamos[3]).toBeInstanceOf(Map)
  })

  test('choseong should match expected initial consonants', () => {
    const expected = [
      'ᄀ',
      'ᄁ',
      'ᄂ',
      'ᄃ',
      'ᄄ',
      'ᄅ',
      'ᄆ',
      'ᄇ',
      'ᄈ',
      'ᄉ',
      'ᄊ',
      'ᄋ',
      'ᄌ',
      'ᄍ',
      'ᄎ',
      'ᄏ',
      'ᄐ',
      'ᄑ',
      'ᄒ'
    ]
    const actual = jamos[0].map(item => item.jamo)
    expect(actual).toStrictEqual(expected)
  })
})
