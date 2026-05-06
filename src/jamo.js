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
      MR: { default: 'k', voiced: 'g' },
      Yale: 'k',
      ᇂ: 'k', // Aspiration: G + H -> K
      RRT: 'g'
    }
  },
  { jamo: 'ᄁ', compat: 'ㄲ', roman: { default: 'kk', MR: 'kk', Yale: 'kk' } },
  {
    jamo: 'ᄂ',
    compat: 'ㄴ',
    roman: {
      default: 'n',
      Yale: 'n',
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
      MR: { default: 't', voiced: 'd', ᆻ: 'tt' }, // tta in MR
      Yale: 't',
      ㄵ: 'dd',
      ㄼ: 'dd',
      ᇂ: 't', // Aspiration: D + H -> T
      RRT: 'd'
    }
  },
  { jamo: 'ᄄ', compat: 'ㄸ', roman: { default: 'tt', MR: 'tt', Yale: 'tt' } },
  {
    jamo: 'ᄅ',
    compat: 'ㄹ',
    roman: {
      default: 'r',
      MR: { default: 'r', voiced: 'r' }, // MR uses 'r' before vowels
      Yale: 'l',
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
  { jamo: 'ᄆ', compat: 'ㅁ', roman: { default: 'm', Yale: 'm' } },
  {
    jamo: 'ᄇ',
    compat: 'ㅂ',
    roman: {
      default: 'b',
      MR: { default: 'p', voiced: 'b' },
      Yale: 'p',
      ᇂ: 'p', // Aspiration: B + H -> P
      RRT: 'b'
    }
  },
  { jamo: 'ᄈ', compat: 'ㅃ', roman: { default: 'pp', MR: 'pp', Yale: 'pp' } },
  {
    jamo: 'ᄉ',
    compat: 'ㅅ',
    roman: { default: 's', MR: 's', Yale: 's', RRT: 's' }
  },
  {
    jamo: 'ᄊ',
    compat: 'ㅆ',
    roman: { default: 'ss', MR: 'ss', Yale: 'ss', RRT: 'ss' }
  },
  {
    jamo: 'ᄋ',
    compat: 'ㅇ',
    roman: {
      default: '', // Silent initial for Linking (Yeoneum)
      Yale: '',
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
      MR: { default: 'ch', voiced: 'j' },
      Yale: 'c',
      ᇂ: 'ch', // Aspiration: J + H -> CH
      RRT: 'j'
    }
  },
  { jamo: 'ᄍ', compat: 'ㅉ', roman: { default: 'jj', MR: 'tch', Yale: 'cc' } },
  { jamo: 'ᄎ', compat: 'ㅊ', roman: { default: 'ch', MR: "ch'", Yale: 'ch' } },
  {
    jamo: 'ᄏ',
    compat: 'ㅋ',
    roman: { default: 'k', MR: "k'", Yale: 'kh' }
  },
  { jamo: 'ᄐ', compat: 'ㅌ', roman: { default: 't', MR: "t'", Yale: 'th' } },
  { jamo: 'ᄑ', compat: 'ㅍ', roman: { default: 'p', MR: "p'", Yale: 'ph' } },
  {
    jamo: 'ᄒ',
    compat: 'ㅎ',
    roman: {
      default: 'h',
      MR: 'h',
      Yale: 'h',
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
  { jamo: 'ᅡ', compat: 'ㅏ', roman: { default: 'a', Yale: 'a' } },
  { jamo: 'ᅢ', compat: 'ㅐ', roman: { default: 'ae', Yale: 'ay' } },
  { jamo: 'ᅣ', compat: 'ㅑ', roman: { default: 'ya', Yale: 'ya' } },
  { jamo: 'ᅤ', compat: 'ㅒ', roman: { default: 'yae', Yale: 'yay' } },
  { jamo: 'ᅥ', compat: 'ㅓ', roman: { default: 'eo', MR: 'ŏ', Yale: 'e' } },
  { jamo: 'ᅦ', compat: 'ㅔ', roman: { default: 'e', Yale: 'ey' } },
  { jamo: 'ᅧ', compat: 'ㅕ', roman: { default: 'yeo', MR: 'yŏ', Yale: 'ye' } },
  { jamo: 'ᅨ', compat: 'ㅖ', roman: { default: 'ye', Yale: 'yey' } },
  { jamo: 'ᅩ', compat: 'ㅗ', roman: { default: 'o', Yale: 'o' } },
  { jamo: 'ᅪ', compat: 'ㅘ', roman: { default: 'wa', Yale: 'wa' } },
  { jamo: 'ᅫ', compat: 'ㅙ', roman: { default: 'wae', Yale: 'way' } },
  { jamo: 'ᅬ', compat: 'ㅚ', roman: { default: 'oe', Yale: 'oy' } },
  { jamo: 'ᅭ', compat: 'ㅛ', roman: { default: 'yo', Yale: 'yo' } },
  { jamo: 'ᅮ', compat: 'ㅜ', roman: { default: 'u', Yale: 'wu' } },
  {
    jamo: 'ᅯ',
    compat: 'ㅝ',
    roman: { default: 'wo', MR: 'wŏ', Yale: 'we' }
  },
  { jamo: 'ᅰ', compat: 'ㅞ', roman: { default: 'we', Yale: 'wey' } },
  { jamo: 'ᅱ', compat: 'ㅟ', roman: { default: 'wi', Yale: 'wi' } },
  { jamo: 'ᅲ', compat: 'ㅠ', roman: { default: 'yu', Yale: 'yu' } },
  { jamo: 'ᅳ', compat: 'ㅡ', roman: { default: 'eu', MR: 'ŭ', Yale: 'u' } },
  { jamo: 'ᅴ', compat: 'ㅢ', roman: { default: 'ui', MR: 'ŭi', Yale: 'uy' } },
  { jamo: 'ᅵ', compat: 'ㅣ', roman: { default: 'i', Yale: 'i' } }
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
      Yale: 'k',
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
    roman: {
      default: 'kk',
      Yale: 'kk',
      RRT: 'kk',
      ...nasalAssimilation.trailingGNg
    }
  },
  {
    jamo: 'ᆪ',
    compat: 'ㄳ',
    roman: { default: 'k', Yale: 'ks', ...nasalAssimilation.trailingGNg }
  },
  {
    jamo: 'ᆫ',
    compat: 'ㄴ',
    roman: { default: 'n', Yale: 'n', ㄱ: 'n', ᄀ: 'n', ㄹ: 'l', ᄅ: 'l' }
  },
  { jamo: 'ᆬ', compat: 'ㄵ', roman: { default: 'n', Yale: 'nc' } },
  { jamo: 'ᆭ', compat: 'ㄶ', roman: { default: 'n', Yale: 'nh' } },
  {
    jamo: 'ᆮ',
    compat: 'ㄷ',
    roman: {
      default: 't',
      Yale: 't',
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
    roman: {
      default: 'l',
      MR: 'l',
      Yale: 'l',
      RRT: 'l',
      vowelNext: 'r',
      ㄴ: 'l',
      ㄹ: 'l'
    }
  },
  {
    jamo: 'ᆰ',
    compat: 'ㄺ',
    roman: { default: 'r', Yale: 'lk', vowelNext: 'lg', ...nasalAssimilation.trailingGNg }
  },
  { jamo: 'ᆱ', compat: 'ㄻ', roman: { default: 'lm', Yale: 'lm' } },
  {
    jamo: 'ᆲ',
    compat: 'ㄼ',
    roman: { default: 'lb', Yale: 'lp', ...nasalAssimilation.trailingBM }
  },
  { jamo: 'ᆳ', compat: 'ㄽ', roman: { default: 'ls', Yale: 'ls' } },
  { jamo: 'ᆴ', compat: 'ㄾ', roman: { default: 'lt', Yale: 'lth' } },
  {
    jamo: 'ᆵ',
    compat: 'ㄿ',
    roman: { default: 'lp', Yale: 'lph', ...nasalAssimilation.trailingBM }
  },
  { jamo: 'ᆶ', compat: 'ㅀ', roman: { default: 'lh', Yale: 'lh' } },
  { jamo: 'ᆷ', compat: 'ㅁ', roman: { default: 'm', Yale: 'm' } },
  {
    jamo: 'ᆸ',
    compat: 'ㅂ',
    roman: {
      default: 'p',
      Yale: 'p',
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
    roman: { default: 'bs', Yale: 'ps', RRT: 'bs', ...nasalAssimilation.trailingBM }
  },
  {
    jamo: 'ᆺ',
    compat: 'ㅅ',
    roman: {
      default: 't',
      Yale: 's',
      vowelNext: 's', // Linking (Yeoneum)
      ㄹ: 'n', // Nasalization: T + R -> N
      ...nasalAssimilation.trailingDN,
      RRT: 's'
    }
  },
  {
    jamo: 'ᆻ',
    compat: 'ㅆ',
    roman: {
      default: 't',
      Yale: 'ss',
      MR: { default: 't', ᄃ: '' }, // Silence ss in MR if followed by d (becomes tta)
      RRT: 'ss',
      ...nasalAssimilation.trailingDN
    }
  },
  { jamo: 'ᆼ', compat: 'ㅇ', roman: { default: 'ng', Yale: 'ng', vowelNext: 'ng-' } },
  {
    jamo: 'ᆽ',
    compat: 'ㅈ',
    roman: {
      default: 't',
      Yale: 'c',
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
      Yale: 'ch',
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
    roman: { default: 'k', Yale: 'kh', RRT: 'k', ...nasalAssimilation.trailingGNg }
  },
  {
    jamo: 'ᇀ',
    compat: 'ㅌ',
    roman: {
      default: 't',
      Yale: 'th',
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
    roman: { default: 'p', Yale: 'ph', ...nasalAssimilation.trailingBM }
  },
  {
    jamo: 'ᇂ',
    compat: 'ㅎ',
    roman: {
      default: 't',
      Yale: 'h',
      vowelNext: 'h',
      MR: { default: 't', voiced: 'h' },
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

export default [choseong, jungseong, jongseong, jamoToCompat]
