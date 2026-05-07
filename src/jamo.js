const fromPairs = pairs =>
  pairs.reduce((cache, pair) => {
    cache[pair[0]] = pair[1]
    return cache
  }, {})
const assimilate = (jamos, sound) => fromPairs(jamos.map(jamo => [jamo, { d: sound }]))

const nasalAssimilators = [
  'ㄴ', // Compatibility Nieun
  String.fromCodePoint(0x1102), // Choseong Nieun
  'ㅁ', // Compatibility Mieum
  String.fromCodePoint(0x1106) // Choseong Mieum
]

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
...
 * Rules handle Aspiration, Lateralization, and Transliteration (RRT) overrides.
 */
const choseong = [
  ['ᄀ', 'ㄱ', { d: 'g', m: { d: 'k', z: 'g' }, y: 'k', ᇂ: 'k', t: 'g' }],
  ['ᄁ', 'ㄲ', { d: 'kk', m: 'kk', y: 'kk' }],
  ['ᄂ', 'ㄴ', { d: 'n', y: 'n', ㄹ: 'l', ᆮ: 'l', t: 'n' }],
  ['ᄃ', 'ㄷ', { d: 'd', m: { d: 't', z: 'd', ᆻ: 'tt' }, y: 't', ㄵ: 'dd', ㄼ: 'dd', ᇂ: 't', t: 'd' }],
  ['ᄄ', 'ㄸ', { d: 'tt', m: 'tt', y: 'tt' }],
  ['ᄅ', 'ㄹ', { d: 'r', m: { d: 'r', z: 'r' }, y: 'l', ㄴ: 'l', ᆰ: 'l', ᆮ: 'l', ㄷ: 'n', ㄹ: 'l', ㅁ: 'n', ㅂ: 'n', ᆳ: 'n', ㅅ: 'n', ㅇ: 'n', ᆷ: 'n', ㅈ: 'n', ㅊ: 'n', ㅌ: 'n', ㅎ: 'n', t: 'l' }],
  ['ᄆ', 'ㅁ', { d: 'm', y: 'm' }],
  ['ᄇ', 'ㅂ', { d: 'b', m: { d: 'p', z: 'b' }, y: 'p', ᇂ: 'p', t: 'b' }],
  ['ᄈ', 'ㅃ', { d: 'pp', m: 'pp', y: 'pp' }],
  ['ᄉ', 'ㅅ', { d: 's', m: 's', y: 's', t: 's' }],
  ['ᄊ', 'ㅆ', { d: 'ss', m: 'ss', y: 'ss', t: 'ss' }],
  ['ᄋ', 'ㅇ', { d: '', y: '', t: '' }],
  ['ᄌ', 'ㅈ', { d: 'j', m: { d: 'ch', z: 'j' }, y: 'c', ᇂ: 'ch', t: 'j' }],
  ['ᄍ', 'ㅉ', { d: 'jj', m: 'tch', y: 'cc' }],
  ['ᄎ', 'ㅊ', { d: 'ch', m: "ch'", y: 'ch' }],
  ['ᄏ', 'ㅋ', { d: 'k', m: "k'", y: 'kh' }],
  ['ᄐ', 'ㅌ', { d: 't', m: "t'", y: 'th' }],
  ['ᄑ', 'ㅍ', { d: 'p', m: "p'", y: 'ph' }],
  ['ᄒ', 'ㅎ', { d: 'h', m: 'h', y: 'h', ᆨ: 'k', ᆮ: { d: 't', ㅣ: 'ch', ᅵ: 'ch' }, ᆸ: 'p', ᆽ: 'ch', t: 'h' }]
]

/**
 * Jungseong (중성 - Medial Vowels).
 */
const jungseong = [
  ['ᅡ', 'ㅏ', { d: 'a', y: 'a' }],
  ['ᅢ', 'ㅐ', { d: 'ae', y: 'ay' }],
  ['ᅣ', 'ㅑ', { d: 'ya', y: 'ya' }],
  ['ᅤ', 'ㅒ', { d: 'yae', y: 'yay' }],
  ['ᅥ', 'ㅓ', { d: 'eo', m: 'ŏ', y: 'e' }],
  ['ᅦ', 'ㅔ', { d: 'e', y: 'ey' }],
  ['ᅧ', 'ㅕ', { d: 'yeo', m: 'yŏ', y: 'ye' }],
  ['ᅨ', 'ㅖ', { d: 'ye', y: 'yey' }],
  ['ᅩ', 'ㅗ', { d: 'o', y: 'o' }],
  ['ᅪ', 'ㅘ', { d: 'wa', y: 'wa' }],
  ['ᅫ', 'ㅙ', { d: 'wae', y: 'way' }],
  ['ᅬ', 'ㅚ', { d: 'oe', y: 'oy' }],
  ['ᅭ', 'ㅛ', { d: 'yo', y: 'yo' }],
  ['ᅮ', 'ㅜ', { d: 'u', y: 'wu' }],
  ['ᅯ', 'ㅝ', { d: 'wo', m: 'wŏ', y: 'we' }],
  ['ᅰ', 'ㅞ', { d: 'we', y: 'wey' }],
  ['ᅱ', 'ㅟ', { d: 'wi', y: 'wi' }],
  ['ᅲ', 'ㅠ', { d: 'yu', y: 'yu' }],
  ['ᅳ', 'ㅡ', { d: 'eu', m: 'ŭ', y: 'u' }],
  ['ᅴ', 'ㅢ', { d: 'ui', m: 'ŭi', y: 'uy' }],
  ['ᅵ', 'ㅣ', { d: 'i', y: 'i' }]
]

/**
 * Jongseong (종성 - Final Consonants).
 * Rules handle Linking (Yeoneum), Nasalization (Bieumhwa), and Aspiration triggering.
 */
const jongseong = [
  [null, null, ''],
  ['ᆨ', 'ㄱ', { d: 'k', y: 'k', v: 'g', ㄹ: 'ng', ᄅ: 'ng', ᄒ: '', ...nasalAssimilation.trailingGNg, t: 'g' }],
  ['ᆩ', 'ㄲ', { d: 'kk', y: 'kk', t: 'kk', ...nasalAssimilation.trailingGNg }],
  ['ᆪ', 'ㄳ', { d: 'k', y: 'ks', ...nasalAssimilation.trailingGNg }],
  ['ᆫ', 'ㄴ', { d: 'n', y: 'n', ㄱ: 'n', ᄀ: 'n', ㄹ: 'l', ᄅ: 'l' }],
  ['ᆬ', 'ㄵ', { d: 'n', y: 'nc' }],
  ['ᆭ', 'ㄶ', { d: 'n', y: 'nh' }],
  ['ᆮ', 'ㄷ', { d: 't', y: 't', v: { d: 'd', ㅣ: 'j', ᅵ: 'j' }, ㄹ: 'n', ᄒ: '', ...nasalAssimilation.trailingDN, t: 'd' }],
  ['ᆯ', 'ㄹ', { d: 'l', m: 'l', y: 'l', t: 'l', v: 'r', ㄴ: 'l', ㄹ: 'l' }],
  ['ᆰ', 'ㄺ', { d: 'r', y: 'lk', v: 'lg', ...nasalAssimilation.trailingGNg }],
  ['ᆱ', 'ㄻ', { d: 'lm', y: 'lm' }],
  ['ᆲ', 'ㄼ', { d: 'lb', y: 'lp', ...nasalAssimilation.trailingBM }],
  ['ᆳ', 'ㄽ', { d: 'ls', y: 'ls' }],
  ['ᆴ', 'ㄾ', { d: 'lt', y: 'lth' }],
  ['ᆵ', 'ㄿ', { d: 'lp', y: 'lph', ...nasalAssimilation.trailingBM }],
  ['ᆶ', 'ㅀ', { d: 'lh', y: 'lh' }],
  ['ᆷ', 'ㅁ', { d: 'm', y: 'm' }],
  ['ᆸ', 'ㅂ', { d: 'p', y: 'p', v: 'b', ㄹ: 'm', ᄅ: 'm', ᄒ: '', ...nasalAssimilation.trailingBM, t: 'b' }],
  ['ᆹ', 'ㅄ', { d: 'bs', y: 'ps', t: 'bs', ...nasalAssimilation.trailingBM }],
  ['ᆺ', 'ㅅ', { d: 't', y: 's', v: 's', ㄹ: 'n', ...nasalAssimilation.trailingDN, t: 's' }],
  ['ᆻ', 'ㅆ', { d: 't', y: 'ss', m: { d: 't', ᄃ: '' }, t: 'ss', ...nasalAssimilation.trailingDN }],
  ['ᆼ', 'ㅇ', { d: 'ng', y: 'ng', v: 'ng-' }],
  ['ᆽ', 'ㅈ', { d: 't', y: 'c', v: 'j', ㄹ: 'n', ᄒ: '', ...nasalAssimilation.trailingDN }],
  ['ᆾ', 'ㅊ', { d: 't', y: 'ch', v: 'ch', ㄱ: 'n', ㄹ: 'n', ...nasalAssimilation.trailingDN, t: 'ch' }],
  ['ᆿ', 'ㅋ', { d: 'k', y: 'kh', t: 'k', ...nasalAssimilation.trailingGNg }],
  ['ᇀ', 'ㅌ', { d: 't', y: 'th', v: { d: 't', ㅣ: 'ch', ᅵ: 'ch' }, ㄹ: 'n', ...nasalAssimilation.trailingDN }],
  ['ᇁ', 'ㅍ', { d: 'p', y: 'ph', ...nasalAssimilation.trailingBM }],
  ['ᇂ', 'ㅎ', { d: 't', y: 'h', v: 'h', m: { d: 't', z: 'h' }, ᄀ: '', ᄃ: '', ᄇ: '', ᄌ: '', ㄱ: 'n', ㄹ: 'n', ㅁ: 'n', t: 'h' }]
]

const hydrate = list => list.map(([j, c, r]) => ({ jamo: j, compat: c, roman: r }))

const hChoseong = hydrate(choseong)
const hJungseong = hydrate(jungseong)
const hJongseong = hydrate(jongseong)

const jamoToCompat = new Map()
;[...hChoseong, ...hJungseong, ...hJongseong].forEach(item => {
  if (item.jamo && item.compat) {
    jamoToCompat.set(item.jamo, item.compat)
  }
})

export default [hChoseong, hJungseong, hJongseong, jamoToCompat]
