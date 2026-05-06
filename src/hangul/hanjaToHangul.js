import {
  decomposeHangulChar,
  decomposeHangul
} from './unicode/decompose.js'
import isHanja from './isHanja.js'

// Ultra-compact common Hanja dictionary (~120 common characters)
const CORE_DICT =
  '大대韓한民민國국女녀子자龍룡路로人인一일二이三삼四사五오六육七칠八팔九구十십百백千천萬만年년月월日일時시分분國국學학校교先선生생愛애中중小소父부母모兄형弟제姊자妹매男남家가食식水수火화山산川천木목金금土토天천地지心심身신體체力력手수足족目목耳이口구鼻비言언語어文문書서차차車거東동西서南남北북見견聞문立립行행來래出출入입開개閉폐高고低저長장短단多다少소好호惡악美미音음安안平평正정位위名명有유無무'

const hanjaMap = new Map()
for (let i = 0; i < CORE_DICT.length; i += 2) {
  hanjaMap.set(CORE_DICT[i], CORE_DICT[i + 1])
}

/**
 * Composes a Hangul syllable from Jamo code points.
 */
function composeSyllable(L, V, T = 0) {
  const LIndex = L - 0x1100
  const VIndex = V - 0x1161
  const TIndex = T === 0 ? 0 : T - 0x11a7
  return String.fromCodePoint((LIndex * 21 + VIndex) * 28 + TIndex + 0xac00)
}

const I_Y_VOWELS = new Set([
  0x1175, // ㅣ
  0x1163, // ㅑ
  0x1167, // ㅕ
  0x116d, // ㅛ
  0x1171, // ㅠ
  0x1164, // ㅒ
  0x1168 // ㅖ
])

/**
 * Applies the South Korean Initial Sound Rule (Dueum Beopchik).
 * @param {string} syllable
 * @returns {string}
 */
function applyInitialSoundRule(syllable) {
  const [L, V, T] = decomposeHangulChar(syllable)
  const isIorY = I_Y_VOWELS.has(V)

  // Rule 1: Initial ㄹ (0x1105)
  if (L === 0x1105) {
    if (isIorY) return composeSyllable(0x110b, V, T) // ㄹ -> ㅇ
    return composeSyllable(0x1102, V, T) // ㄹ -> ㄴ
  }

  // Rule 2: Initial ㄴ (0x1102)
  if (L === 0x1102 && isIorY) {
    return composeSyllable(0x110b, V, T) // ㄴ -> ㅇ
  }

  return syllable
}

/**
 * Converts Hanja characters in a string to their Hangul equivalents.
 * @param {string} text
 * @param {Object} [options]
 * @param {boolean} [options.initialSoundRule=true]
 * @returns {string}
 */
export const hanjaToHangul = (text, options = {}) => {
  const { initialSoundRule = true } = options
  let result = ''
  let isStartOfWord = true

  for (let i = 0; i < text.length; i++) {
    const char = text[i]

    if (isHanja(char)) {
      let hangul = hanjaMap.get(char) || char
      if (hangul !== char && initialSoundRule && isStartOfWord) {
        hangul = applyInitialSoundRule(hangul)
      }
      result += hangul
      isStartOfWord = false
    } else {
      result += char
      if (/\s/.test(char) || /[^\w\uAC00-\uD7AF]/.test(char)) {
        isStartOfWord = true
      }
    }
  }

  return result
}
