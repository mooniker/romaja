const hangulPattern = require('./hangulPattern')
const HANGUL_BLOCKS = Object.entries(require('./blocks')).filter(
  ([blockName]) => blockName.startsWith('HANGUL')
)

const hangulBlockBoundaryRegex = () =>
  new RegExp(
    '[' +
      HANGUL_BLOCKS.map(
        ([, [start, stop]]) =>
          `\\u${start.toString(16)}-\\u${stop.toString(16)}`
      ).join('') +
      ']+',
    'g'
  )

describe('Hangul regular expression pattern used in text replacement', () => {
  test('should conform to known boundaries of Hangul Unicode blocks', () => {
    expect(hangulBlockBoundaryRegex()).toEqual(hangulPattern)
  })
})

const testCases = [
  {
    text: '창세가 is a shamanistic creation myth from 함훙, 함경도.',
    hangulWords: ['창세가', '함훙', '함경도']
  },
  {
    text: '천지왕본풀이 is a shamanistic creation myth from 제주도.',
    hangulWords: ['천지왕본풀이', '제주도']
  },
  {
    text: '마고할미 is a creation myth from the 관북 region of 함경북도.',
    hangulWords: ['마고할미', '관북', '함경북도']
  },
  {
    text: '시루말 is a shamanistic creation myth from 오산, 경기도.',
    hangulWords: ['시루말', '오산', '경기도']
  }
]

describe('String.replace with hangul pattern and callback', () => {
  testCases.forEach(({ text, hangulWords }) => {
    test(`should find [${hangulWords.join(', ')}] in "${text}"`, () => {
      const mockCallback = jest.fn()
      text.replace(hangulPattern, mockCallback)
      hangulWords.forEach((word, idx) => {
        expect(mockCallback.mock.calls[idx][0] === word)
      })
    })
  })

  test(`should find nothing in a given Japanese sentence`, () => {
    const nara =
      '8世紀初頭から末にかけては奈良時代と呼ばれ、奈良に都城（平城京）が置かれた。'
    const mockCallback = jest.fn()
    nara.replace(hangulPattern, mockCallback)
    expect(mockCallback).not.toHaveBeenCalled()
  })

  test(`should find nothing in a given English sentence`, () => {
    const seoJaePil =
      'One of the first Korean Americans was Seo Jae-pil, or Philip Jaisohn, who came to America shortly after participating in an abortive coup with other progressives to institute political reform in 1884. He became a citizen in 1890 and earned a medical degree in 1892 from what is now George Washington University.'
    const mockCallback = jest.fn()
    seoJaePil.replace(hangulPattern, mockCallback)
    expect(mockCallback).not.toHaveBeenCalled()
  })
})
