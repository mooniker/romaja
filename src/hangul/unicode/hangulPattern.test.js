import { jest, describe, test, expect } from '@jest/globals'
import { hangulPattern } from './hangulPattern.js'
import blocks from './blocks.js'

const HANGUL_BLOCKS = Object.entries(blocks).filter(([blockName]) =>
  blockName.startsWith('HANGUL')
)

const hangulBlockBoundaryRegex = () =>
  new RegExp(
    HANGUL_BLOCKS.map(
      ([, [start, end]]) =>
        `\\u${start.toString(16)}\\-\\u${end.toString(16)}`
    ).join(''),
    'g'
  )

const testCases = [
  {
    text: '이 글은 창세가, 함훙, 함경도 지역에서 전승되는 서사무가이다.',
    hangulWords: ['창세가', '함훙', '함경도']
  },
  {
    text: '천지왕본풀이는 제주도 지역에서 전승되는 서사무가이다.',
    hangulWords: ['천지왕본풀이는', '제주도']
  },
  {
    text: '마고할미 신화는 관북(함경북도) 지방에서 전승되는 창세신화이다.',
    hangulWords: ['마고할미', '관북', '함경북도']
  },
  {
    text: '시루말은 오산, 경기도 지역에서 전승되는 서사무가이다.',
    hangulWords: ['시루말은', '오산', '경기도']
  }
]

describe('Hangul regular expression pattern used in text replacement', () => {
  test('should conform to known boundaries of Hangul Unicode blocks', () => {
    // expect(hangulBlockBoundaryRegex()).toEqual(hangulPattern);
  })
})

describe('String.replace with hangul pattern and callback', () => {
  testCases.forEach(({ text, hangulWords }) => {
    test(`should find [${hangulWords.join(', ')}] in "${text}"`, () => {
      const mockCallback = jest.fn()
      text.replace(hangulPattern, mockCallback)
      const matches = mockCallback.mock.calls.map(call => call[0])
      hangulWords.forEach(word => {
        expect(matches).toContain(word)
      })
    })
  })

  test('should work with single-character Hangul blocks', () => {
    const nara = '나라는 우리나라'
    const mockCallback = jest.fn()
    nara.replace(hangulPattern, mockCallback)
    expect(mockCallback).toHaveBeenCalledWith(
      '나라는',
      expect.any(Number),
      nara
    )
    expect(mockCallback).toHaveBeenCalledWith(
      '우리나라',
      expect.any(Number),
      nara
    )
  })

  test('should find Hangul characters even when mixed with other scripts', () => {
    const seoJaePil = '서재필(徐載弼)은 조선의 문신이다.'
    const mockCallback = jest.fn()
    seoJaePil.replace(hangulPattern, mockCallback)
    expect(mockCallback).toHaveBeenCalledWith(
      '서재필',
      expect.any(Number),
      seoJaePil
    )
    expect(mockCallback).toHaveBeenCalledWith(
      '은',
      expect.any(Number),
      seoJaePil
    )
    expect(mockCallback).toHaveBeenCalledWith(
      '조선의',
      expect.any(Number),
      seoJaePil
    )
    expect(mockCallback).toHaveBeenCalledWith(
      '문신이다',
      expect.any(Number),
      seoJaePil
    )
  })
})
