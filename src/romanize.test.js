import { jest, describe, test, expect } from '@jest/globals'
import { romanize, romanizeWord } from './index.js'
import testData from '../test/index.js'

const words = Object.entries(testData.words)

describe('romanizeWord function', () => {
  describe('should romanize simple words', () => {
    words
      .filter(([, { tags, RR }]) => RR && tags && tags.includes('simple'))
      .forEach(([hangulWord, { RR }]) => {
        const expected = Array.isArray(RR) ? RR[0] : RR
        test(`${hangulWord} to ${expected}`, () => {
          expect(romanizeWord(hangulWord).toLowerCase()).toBe(
            expected.toLowerCase()
          )
        })
      })
  })

  describe('should romanize words with assimilation rules', () => {
    words
      .filter(([, { tags, RR }]) => RR && tags && tags.includes('assimilation'))
      .forEach(([hangulWord, { RR }]) => {
        const expected = Array.isArray(RR) ? RR[0] : RR
        test(`${hangulWord} to ${expected}`, () => {
          expect(romanizeWord(hangulWord).toLowerCase()).toBe(
            expected.toLowerCase()
          )
        })
      })
  })

  describe('should romanize words with palatalization rules', () => {
    words
      .filter(([, { tags, RR }]) => RR && tags && tags.includes('palatalization'))
      .forEach(([hangulWord, { RR }]) => {
        const expected = Array.isArray(RR) ? RR[0] : RR
        test(`${hangulWord} to ${expected}`, () => {
          expect(romanizeWord(hangulWord).toLowerCase()).toBe(
            expected.toLowerCase()
          )
        })
      })
  })

  describe('should romanize words with plosive rules', () => {
    words
      .filter(([, { tags, RR }]) => RR && tags && tags.includes('plosive'))
      .forEach(([hangulWord, { RR }]) => {
        const expected = Array.isArray(RR) ? RR[0] : RR
        test(`${hangulWord} to ${expected}`, () => {
          expect(romanizeWord(hangulWord).toLowerCase()).toBe(
            expected.toLowerCase()
          )
        })
      })
  })

  describe('should transliterate', () => {
    words
      .filter(([, { RRT }]) => RRT)
      .forEach(([hangulWord, { RRT }]) => {
        test(`${hangulWord} to ${RRT}`, () => {
          expect(romanizeWord(hangulWord, { method: 'RRT' }).toLowerCase()).toBe(
            RRT.toLowerCase()
          )
        })
      })
  })

  describe('phonetic rules (aspiration and palatalization)', () => {
    test('aspiration: 좋다 to jota', () => {
      expect(romanizeWord('좋다')).toBe('jota')
    })
    test('aspiration: 먹히다 to meokida', () => {
      expect(romanizeWord('먹히다')).toBe('meokida')
    })
    test('palatalization: 해돋이 to haedoji', () => {
      expect(romanizeWord('해돋이')).toBe('haedoji')
    })
    test('palatalization: 같이 to gachi', () => {
      expect(romanizeWord('같이')).toBe('gachi')
    })
    test('combined: 굳히다 to guchida', () => {
      expect(romanizeWord('굳히다')).toBe('guchida')
    })
  })

  describe('McCune-Reischauer (MR) method', () => {
    test('initial plosives should be k, t, p, ch', () => {
      expect(romanizeWord('부산', { method: 'MR' })).toBe('pusan')
      expect(romanizeWord('대구', { method: 'MR' })).toBe('taegu')
      expect(romanizeWord('광주', { method: 'MR' })).toBe('kwangju')
      expect(romanizeWord('진주', { method: 'MR' })).toBe('chinju')
    })

    test('voiced plosives between vowels should be g, d, b, j', () => {
      expect(romanizeWord('국어', { method: 'MR' })).toBe('kugŏ')
      expect(romanizeWord('대구', { method: 'MR' })).toBe('taegu')
      expect(romanizeWord('진주', { method: 'MR' })).toBe('chinju')
    })

    test('special vowels (eo, eu) should use breves', () => {
      expect(romanizeWord('먹었다', { method: 'MR' })).toBe('mŏgŏtta')
      expect(romanizeWord('금강', { method: 'MR' })).toBe('kŭmgang')
    })

    test('aspirated consonants should use apostrophes', () => {
      expect(romanizeWord('김치', { method: 'MR' })).toBe("kimch'i")
      expect(romanizeWord('쾌차', { method: 'MR' })).toBe("k'waech'a")
    })
  })

  describe('custom override dictionary', () => {
    test('should override using an object', () => {
      const options = { overrides: { 삼성: 'Samsung', 현대: 'Hyundai' } }
      expect(romanizeWord('삼성', options)).toBe('Samsung')
      expect(romanizeWord('현대', options)).toBe('Hyundai')
    })

    test('should override using a Map', () => {
      const overrides = new Map([['삼성', 'Samsung']])
      expect(romanizeWord('삼성', { overrides })).toBe('Samsung')
    })

    test('should work within romanize function', () => {
      const text = '삼성 means Three Stars.'
      const options = { overrides: { 삼성: 'Samsung' } }
      expect(romanize(text, options)).toBe('Samsung means Three Stars.')
    })
  })

  describe('hanja support', () => {
    test('should romanize common hanja', () => {
      expect(romanize('大韓民國', { hanja: true })).toBe('daehanminguk')
    })

    test('should apply South Korean Initial Sound Rule', () => {
      // 女子 (녀자 -> 여자)
      expect(romanize('女子', { hanja: true })).toBe('yeoja')
    })

    test('should allow disabling Initial Sound Rule (North Korean style)', () => {
      expect(romanize('女子', { hanja: true, initialSoundRule: false })).toBe(
        'nyeoja'
      )
    })

    test('should handle mixed Hanja and Hangul', () => {
      expect(romanize('大韓은 한글.', { hanja: true })).toBe('daehaneun hangeul.')
    })
  })
})

describe('romanize function', () => {
  test('should romanize Hangul string with spaces', () => {
    expect(romanize('국어의 로마자 표기법')).toBe('gugeoui romaja pyogibeop')
  })

  test('should romanize only Hangul parts of a given string', () => {
    expect(romanize('The name of the script is 한글.')).toBe(
      'The name of the script is hangeul.'
    )
  })

  describe('Ruby output option', () => {
    const actual = romanize('루비', { ruby: true })
    test('should return an array of romanized parts', () => {
      expect(actual).toBeInstanceOf(Array)
    })

    test('should include original/input Hangul string in output object package for Ruby annotations', () => {
      const [{ ruby, text }] = actual.filter(item => typeof item === 'object')
      expect(ruby).toBe('루비')
      expect(text).toBe('rubi')
    })
  })
})
