const { romanize } = require('./')
const { romanizeWord } = require('./romanize')
const words = Object.entries(require('../test').words)

describe('romanizeWord function', () => {
  describe('should romanize simple words', () => {
    words
      .filter(([, { RR, tags }]) => RR && tags && tags.includes('simple'))
      .forEach(([hangulWord, { RR }]) => {
        test(`${hangulWord} to ${RR}`, () => {
          expect(romanizeWord(hangulWord)).toBe(RR)
        })
      })
  })

  describe("should transcribe plosives/stops ㄱ, ㄷ, and ㅂ as 'g', 'd', and 'b' before a vowel and as 'k', 't', and 'p' when before another consonant or as the last sound of a word", () => {
    words
      .filter(([, { RR, tags }]) => RR && tags && tags.includes('plosives'))
      .forEach(([hangulWord, { RR }]) => {
        test(`${hangulWord} to ${RR}`, () => {
          expect(romanizeWord(hangulWord)).toBe(RR.toLowerCase())
        })
      })
  })

  describe('should words with adjacent consonant assimilation', () => {
    words
      .filter(([, { RR, tags }]) => RR && tags && tags.includes('assimilation'))
      .forEach(([hangulWord, { RR }]) => {
        test(`${hangulWord} to ${RR}`, () => {
          expect(romanizeWord(hangulWord, 'RR')).toBe(RR.toLowerCase())
        })
      })
  })

  describe('should transliterate', () => {
    words
      .filter(([, { RRT }]) => RRT)
      .forEach(([hangulWord, { RRT }]) => {
        test(`${hangulWord} to ${RRT}`, () => {
          expect(romanizeWord(hangulWord, { method: 'RRT' })).toBe(
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
      expect(romanizeWord('김치', { method: 'MR' })).toBe('kimch\'i')
      expect(romanizeWord('쾌차', { method: 'MR' })).toBe('k\'waech\'a')
    })
  })
})

describe('romanize function', () => {
  test('should romanize Hangul string with spaces', () => {
    expect(romanize('국어의 로마자 표기법')).toBe('gugeoui romaja pyogibeop')
  })

  test('should romanize 로마자 as romaja', () => {
    expect(romanize('The Korean word for Latin letters is 로마자.')).toBe(
      'The Korean word for Latin letters is romaja.'
    )
  })

  test('should romanize only Hangul parts of a given string', () => {
    expect(
      romanize(
        'The Revised Romanization of Korean (국어의 로마자 표기법; 國語의 로마字 表記法; gugeoui romaja pyogibeop. op; lit. "Roman-letter notation of the national language") is the official Korean language romanization system in South Korea.'
      )
    ).toBe(
      'The Revised Romanization of Korean (gugeoui romaja pyogibeop; 國語ui roma字 表記法; gugeoui romaja pyogibeop. op; lit. "Roman-letter notation of the national language") is the official Korean language romanization system in South Korea.'
    )
  })

  describe('when ruby annotations requested', () => {
    const actual = romanize(
      'Ruby characters (루비) are small, annotative glosses that are usually placed above or to the right of logographic characters such as Chinese, Japanese, Korean, or Vietnamese to show the pronunciation.',
      { ruby: true }
    )
    test('should return an array', () => {
      expect(actual).toBeInstanceOf(Array)
    })

    test('should include original/input Hangul string in output object package for Ruby annotations', () => {
      const [{ ruby, text }] = actual.filter(item => typeof item === 'object')
      expect(ruby).toBe('루비')
      expect(text).toBe('rubi')
    })
  })
})
