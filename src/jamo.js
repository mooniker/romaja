const fromPairs = pairs =>
  pairs.reduce((cache, pair) => {
    cache[pair[0]] = pair[1]
    return cache
  }, {})

const assimilate = (jamos, sound) => fromPairs(jamos.map(jamo => [jamo, sound]))

const nasalAssimilators = [
  'ㄴ', // Compatibility Nieun
  String.fromCodePoint(0x1102), // Choseong Nieun
  'ㅁ', // Compatibility Mieum
  String.fromCodePoint(0x1106) // Choseong Mieum
]

/**
 * Nasalization (Bieumhwa - 비음화) rules.
 * Final consonants shift to nasal sounds when followed by Nieun (ㄴ) or Mieum (ㅁ).
 */
const nasalAssimilation = {
  // Plosives P/B (ㅂ, ㅍ, ㅄ, ㄿ, ㄼ) -> Nasal M (ㅁ)
  trailingBM: assimilate(nasalAssimilators, 'm'),
  // Plosives T/D (ㄷ, ㅌ, ㅈ, ㅊ, ㅅ, ㅆ, ㅎ) -> Nasal N (ㄴ)
  trailingDN: assimilate(nasalAssimilators, 'n'),
  // Plosives K/G (ㄱ, ㅋ, ㄲ, ㄳ, ㄺ) -> Nasal NG (ㅇ)
  trailingGNg: assimilate(nasalAssimilators, 'ng')
}

/**
 * Choseong (초성 - Initial Consonants).
 * Rules handle Aspiration, Lateralization, and Transliteration (RRT) overrides.
 */
const choseong = [
  {
    jamo: 'ᄀ',
    compat: 'ㄱ',
    roman: {
      default: 'g',
      MR: 'k',
      ᇂ: 'k', // Aspiration: G + H -> K
      RRT: 'g'
    }
  },
  { jamo: 'ᄁ', compat: 'ㄲ', roman: 'kk' },
  {
    jamo: 'ᄂ',
    compat: 'ㄴ',
    roman: {
      default: 'n',
      ㄹ: 'l', // Lateralization: N + L -> L
      ᆮ: 'l',
      RRT: 'n'
    }
  },
  {
    jamo: 'ᄃ',
    compat: 'ㄷ',
    roman: {
      default: 'd',
      ㄵ: 'dd',
      ㄼ: 'dd',
      ᇂ: 't', // Aspiration: D + H -> T
      RRT: 'd'
    }
  },
  { jamo: 'ᄄ', compat: 'ㄸ', roman: 'tt' },
  {
    jamo: 'ᄅ',
    compat: 'ㄹ',
    roman: {
      default: 'r',
      ㄴ: 'l', // Lateralization: R + N -> L
      ᆰ: 'l',
      ᆮ: 'l',
      ㄷ: 'n',
      ㄹ: 'l',
      ㅁ: 'n',
      ㅂ: 'n',
      ᆳ: 'n',
      ㅅ: 'n',
      ㅇ: 'n',
      ᆷ: 'n',
      ㅈ: 'n',
      ㅊ: 'n',
      ㅌ: 'n',
      ㅎ: 'n',
      RRT: 'l'
    }
  },
  { jamo: 'ᄆ', compat: 'ㅁ', roman: 'm' },
  {
    jamo: 'ᄇ',
    compat: 'ㅂ',
    roman: {
      default: 'b',
      ᇂ: 'p', // Aspiration: B + H -> P
      RRT: 'b'
    }
  },
  { jamo: 'ᄈ', compat: 'ㅃ', roman: 'pp' },
  { jamo: 'ᄉ', compat: 'ㅅ', roman: 's' },
  { jamo: 'ᄊ', compat: 'ㅆ', roman: 'ss' },
  {
    jamo: 'ᄋ',
    compat: 'ㅇ',
    roman: {
      default: '', // Silent initial for Linking (Yeoneum)
      血液: 'j',
      ㄼ: 'b',
      RRT: ''
    }
  },
  {
    jamo: 'ᄌ',
    compat: 'ㅈ',
    roman: {
      default: 'j',
      ᇂ: 'ch', // Aspiration: J + H -> CH
      RRT: 'j'
    }
  },
  { jamo: 'ᄍ', compat: 'ㅉ', roman: 'jj' },
  { jamo: 'ᄎ', compat: 'ㅊ', roman: 'ch' },
  {
    jamo: 'ᄏ',
    compat: 'ㅋ',
    roman: { default: 'k', MR: "k'" }
  },
  { jamo: 'ᄐ', compat: 'ㅌ', roman: 't' },
  { jamo: 'ᄑ', compat: 'ㅍ', roman: 'p' },
  {
    jamo: 'ᄒ',
    compat: 'ㅎ',
    roman: {
      default: 'h',
      ᆨ: 'k', // Aspiration: K + H -> K
      ᆮ: {
        default: 't', // Aspiration: T + H -> T
        ㅣ: 'ch', // Palatalization + Aspiration: T + H + I -> CH
        ᅵ: 'ch'
      },
      ᆸ: 'p', // Aspiration: P + H -> P
      ᆽ: 'ch', // Aspiration: CH + H -> CH
      RRT: 'h'
    }
  }
]

/**
 * Jungseong (중성 - Medial Vowels).
 */
const jungseong = [
  { jamo: 'ᅡ', compat: 'ㅏ', roman: 'a' },
  { jamo: 'ᅢ', compat: 'ㅐ', roman: 'ae' },
  { jamo: 'ᅣ', compat: 'ㅑ', roman: 'ya' },
  { jamo: 'ᅤ', compat: 'ㅒ', roman: 'yae' },
  { jamo: 'ᅥ', compat: 'ㅓ', roman: 'eo' },
  { jamo: 'ᅦ', compat: 'ㅔ', roman: 'e' },
  { jamo: 'ᅧ', compat: 'ㅕ', roman: 'yeo' },
  { jamo: 'ᅨ', compat: 'ㅖ', roman: 'ye' },
  { jamo: 'ᅩ', compat: 'ㅗ', roman: 'o' },
  { jamo: 'ᅪ', compat: 'ㅘ', roman: 'wa' },
  { jamo: 'ᅫ', compat: 'ㅙ', roman: 'wae' },
  { jamo: 'ᅬ', compat: 'ㅚ', roman: 'woe' },
  { jamo: 'ᅭ', compat: 'ㅛ', roman: 'yo' },
  { jamo: 'ᅮ', compat: 'ㅜ', roman: 'u' },
  { jamo: 'ᅯ', compat: '원', roman: 'wo' },
  { jamo: 'ᅰ', compat: 'ㅞ', roman: 'we' },
  { jamo: 'ᅱ', compat: 'ㅟ', roman: 'wi' },
  { jamo: 'ᅲ', compat: 'ㅠ', roman: 'yu' },
  { jamo: 'ᅳ', compat: 'ㅡ', roman: 'eu' },
  { jamo: 'ᅴ', compat: 'ㅢ', roman: 'ui' },
  { jamo: 'ᅵ', compat: 'ㅣ', roman: 'i' }
]

/**
 * Jongseong (종성 - Final Consonants).
 * Rules handle Linking (Yeoneum), Nasalization (Bieumhwa), and Aspiration triggering.
 */
const jongseong = [
  { jamo: null, compat: null, roman: '' },
  {
    jamo: 'ᆨ',
    compat: 'ㄱ',
    roman: {
      default: 'k',
      vowelNext: 'g', // Linking (Yeoneum)
      ㄹ: 'ng', // Nasalization: K + R -> NG
      ᄅ: 'ng',
      ᄒ: '', // Silence K; aspiration handled by following H
      ...nasalAssimilation.trailingGNg,
      RRT: 'g'
    }
  },
  {
    jamo: 'ᆩ',
    compat: 'ㄲ',
    roman: { default: 'kk', RRT: 'kk', ...nasalAssimilation.trailingGNg }
  },
  {
    jamo: 'ᆪ',
    compat: 'ㄳ',
    roman: { default: 'k', ...nasalAssimilation.trailingGNg }
  },
  {
    jamo: 'ᆫ',
    compat: 'ㄴ',
    roman: { default: 'n', ㄱ: 'n', ᄀ: 'n', ㄹ: 'l', ᄅ: 'l' }
  },
  { jamo: 'ᆬ', compat: 'ㄵ', roman: 'n' },
  { jamo: 'ᆭ', compat: 'ㄶ', roman: 'n' },
  {
    jamo: 'ᆮ',
    compat: 'ㄷ',
    roman: {
      default: 't',
      vowelNext: {
        default: 'd', // Linking (Yeoneum)
        ㅣ: 'j', // Palatalization: D + I -> J
        ᅵ: 'j'
      },
      ㄹ: 'n', // Nasalization: T + R -> N
      ᄒ: '', // Silence D; aspiration handled by following H
      ...nasalAssimilation.trailingDN,
      RRT: 'd'
    }
  },
  {
    jamo: 'ᆯ',
    compat: 'ㄹ',
    roman: { default: 'l', RRT: 'l', vowelNext: 'r', ㄴ: 'l', ㄹ: 'l' }
  },
  {
    jamo: 'ᆰ',
    compat: 'ㄺ',
    roman: { default: 'r', vowelNext: 'lg', ...nasalAssimilation.trailingGNg }
  },
  { jamo: 'ᆱ', compat: 'ㄻ', roman: 'lm' },
  {
    jamo: 'ᆲ',
    compat: 'ㄼ',
    roman: { default: 'lb', ...nasalAssimilation.trailingBM }
  },
  { jamo: 'ᆳ', compat: 'ㄽ', roman: 'ls' },
  { jamo: 'ᆴ', compat: 'ㄾ', roman: 'lt' },
  {
    jamo: 'ᆵ',
    compat: 'ㄿ',
    roman: { default: 'lp', ...nasalAssimilation.trailingBM }
  },
  { jamo: 'ᆶ', compat: 'ㅀ', roman: 'lh' },
  { jamo: 'ᆷ', compat: 'ㅁ', roman: 'm' },
  {
    jamo: 'ᆸ',
    compat: 'ㅂ',
    roman: {
      default: 'p',
      vowelNext: 'b', // Linking (Yeoneum)
      ㄹ: 'm', // Nasalization: P + R -> M
      ᄅ: 'm',
      ᄒ: '', // Silence P; aspiration handled by following H
      ...nasalAssimilation.trailingBM,
      RRT: 'b'
    }
  },
  {
    jamo: 'ᆹ',
    compat: 'ㅄ',
    roman: { default: 'bs', RRT: 'bs', ...nasalAssimilation.trailingBM }
  },
  {
    jamo: 'ᆺ',
    compat: 'ㅅ',
    roman: {
      default: 't',
      vowelNext: 's', // Linking (Yeoneum)
      ㄹ: 'n', // Nasalization: T + R -> N
      ...nasalAssimilation.trailingDN,
      RRT: 's'
    }
  },
  {
    jamo: 'ᆻ',
    compat: 'ㅆ',
    roman: { default: 'ss', ...nasalAssimilation.trailingDN }
  },
  { jamo: 'ᆼ', compat: 'ㅇ', roman: { default: 'ng', vowelNext: 'ng-' } },
  {
    jamo: 'ᆽ',
    compat: 'ㅈ',
    roman: {
      default: 't',
      vowelNext: 'j', // Linking (Yeoneum)
      ㄹ: 'n', // Nasalization: CH + R -> N
      ᄒ: '', // Silence J; aspiration handled by following H
      ...nasalAssimilation.trailingDN
    }
  },
  {
    jamo: 'ᆾ',
    compat: 'ㅊ',
    roman: {
      default: 't',
      vowelNext: 'ch',
      ㄱ: 'n',
      ㄹ: 'n',
      ...nasalAssimilation.trailingDN,
      RRT: 'ch'
    }
  },
  {
    jamo: 'ᆿ',
    compat: 'ㅋ',
    roman: { default: 'k', RRT: 'k', ...nasalAssimilation.trailingGNg }
  },
  {
    jamo: 'ᇀ',
    compat: 'ㅌ',
    roman: {
      default: 't',
      vowelNext: {
        default: 't', // Linking (Yeoneum)
        ㅣ: 'ch', // Palatalization: T + I -> CH
        ᅵ: 'ch'
      },
      ㄹ: 'n', // Nasalization
      ...nasalAssimilation.trailingDN
    }
  },
  {
    jamo: 'ᇁ',
    compat: 'ㅍ',
    roman: { default: 'p', ...nasalAssimilation.trailingBM }
  },
  {
    jamo: 'ᇂ',
    compat: 'ㅎ',
    roman: {
      default: 't',
      vowelNext: 'h',
      ᄀ: '', // Silence H; aspiration handled by following Plosive
      ᄃ: '',
      ᄇ: '',
      ᄌ: '',
      ㄱ: 'n',
      ㄹ: 'n',
      ㅁ: 'n',
      RRT: 'h'
    }
  }
]

const jamoToCompat = new Map()
;[...choseong, ...jungseong, ...jongseong].forEach(item => {
  if (item.jamo && item.compat) {
    jamoToCompat.set(item.jamo, item.compat)
  }
})

module.exports = [choseong, jungseong, jongseong, jamoToCompat]
