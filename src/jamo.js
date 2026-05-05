const fromPairs = pairs =>
  pairs.reduce((cache, pair) => {
    cache[pair[0]] = pair[1]
    return cache
  }, {})

const assimilate = (jamos, sound) => fromPairs(jamos.map(jamo => [jamo, sound]))

const nasalAssimilators = [
  'ㄴ',
  String.fromCodePoint(0x1102),
  'ㅁ',
  String.fromCodePoint(0x1106)
]

const nasalAssimilation = {
  trailingBM: assimilate(nasalAssimilators, 'm'),
  trailingDN: assimilate(nasalAssimilators, 'n'),
  trailingGNg: assimilate(nasalAssimilators, 'ng')
}

const choseong = [
  {
    jamo: 'ᄀ',
    compat: 'ㄱ',
    roman: { default: 'g', MR: 'k', ᇂ: 'k', RRT: 'g' }
  },
  { jamo: 'ᄁ', compat: 'ㄲ', roman: 'kk' },
  {
    jamo: 'ᄂ',
    compat: 'ㄴ',
    roman: { default: 'n', ㄹ: 'l', ᆮ: 'l', RRT: 'n' }
  },
  {
    jamo: 'ᄃ',
    compat: 'ㄷ',
    roman: { default: 'd', ㄵ: 'dd', ㄼ: 'dd', ᇂ: 't', RRT: 'd' }
  },
  { jamo: 'ᄄ', compat: 'ㄸ', roman: 'tt' },
  {
    jamo: 'ᄅ',
    compat: 'ㄹ',
    roman: {
      default: 'r',
      ㄴ: 'l',
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
  { jamo: 'ᄇ', compat: 'ㅂ', roman: { default: 'b', ᇂ: 'p', RRT: 'b' } },
  { jamo: 'ᄈ', compat: 'ㅃ', roman: 'pp' },
  { jamo: 'ᄉ', compat: 'ㅅ', roman: 's' },
  { jamo: 'ᄊ', compat: 'ㅆ', roman: 'ss' },
  {
    jamo: 'ᄋ',
    compat: 'ㅇ',
    roman: { default: '', ㄵ: 'j', ㄼ: 'b', RRT: '' }
  },
  { jamo: 'ᄌ', compat: 'ㅈ', roman: { default: 'j', ᇂ: 'ch', RRT: 'j' } },
  { jamo: 'ᄍ', compat: 'ㅉ', roman: 'jj' },
  { jamo: 'ᄎ', compat: 'ㅊ', roman: 'ch' },
  { jamo: 'ᄏ', compat: 'ㅋ', roman: { default: 'k', MR: "k'" } },
  { jamo: 'ᄐ', compat: 'ㅌ', roman: 't' },
  { jamo: 'ᄑ', compat: 'ㅍ', roman: 'p' },
  {
    jamo: 'ᄒ',
    compat: 'ㅎ',
    roman: {
      default: 'h',
      ᆨ: 'k',
      ᆮ: { default: 't', ㅣ: 'ch', ᅵ: 'ch' },
      ᆸ: 'p',
      ᆽ: 'ch',
      RRT: 'h'
    }
  }
]

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
  { jamo: 'ᅯ', compat: 'ㅝ', roman: 'wo' },
  { jamo: 'ᅰ', compat: 'ㅞ', roman: 'we' },
  { jamo: 'ᅱ', compat: 'ㅟ', roman: 'wi' },
  { jamo: 'ᅲ', compat: 'ㅠ', roman: 'yu' },
  { jamo: 'ᅳ', compat: 'ㅡ', roman: 'eu' },
  { jamo: 'ᅴ', compat: 'ㅢ', roman: 'ui' },
  { jamo: 'ᅵ', compat: 'ㅣ', roman: 'i' }
]

const jongseong = [
  { jamo: null, compat: null, roman: '' },
  {
    jamo: 'ᆨ',
    compat: 'ㄱ',
    roman: {
      default: 'k',
      vowelNext: 'g',
      ㄹ: 'ng',
      ᄅ: 'ng',
      ᄒ: '',
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
      vowelNext: { default: 'd', ㅣ: 'j', ᅵ: 'j' },
      ㄹ: 'n',
      ᄒ: '',
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
      vowelNext: 'b',
      ㄹ: 'm',
      ᄅ: 'm',
      ᄒ: '',
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
      vowelNext: 's',
      ㄹ: 'n',
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
      vowelNext: 'j',
      ㄹ: 'n',
      ᄒ: '',
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
      vowelNext: { default: 't', ㅣ: 'ch', ᅵ: 'ch' },
      ㄹ: 'n',
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
      ᄀ: '',
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
