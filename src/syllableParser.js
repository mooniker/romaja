import jamoData from './jamo.js'

const jamoToCompat = jamoData[3]

function createJamoMap(data) {
  const map = new Map()
  data.forEach(item => {
    if (item.jamo) map.set(item.jamo, item.roman)
    if (item.compat) map.set(item.compat, item.roman)
    // Support code points
    if (item.jamo) map.set(item.jamo.codePointAt(0), item.roman)
    if (item.compat) map.set(item.compat.codePointAt(0), item.roman)
  })
  return map
}

const maps = [
  createJamoMap(jamoData[0]),
  createJamoMap(jamoData[1]),
  createJamoMap(jamoData[2])
]

const methodMap = {
  MR: 'm',
  Yale: 'y',
  RRT: 't'
}

function resolveRoman(rules, params) {
  let current = rules
  const {
    method,
    vowelNext,
    nextJungseong,
    consonantNext,
    consonantPrev,
    isVoiced
  } = params

  const mKey = methodMap[method] || method

  while (
    typeof current !== 'string' &&
    current !== null &&
    current !== undefined
  ) {
    if (current.roman !== undefined) {
      current = current.roman
      continue
    }

    // Try short key first, then long key
    if (mKey && current[mKey] !== undefined) {
      if (
        typeof current[mKey] === 'object' &&
        isVoiced &&
        (current[mKey].z !== undefined || current[mKey].voiced !== undefined)
      ) {
        current = current[mKey].z !== undefined ? current[mKey].z : current[mKey].voiced
        continue
      }
      current = current[mKey]
      continue
    }

    if (isVoiced && (current.z !== undefined || current.voiced !== undefined)) {
      current = current.z !== undefined ? current.z : current.voiced
      continue
    }

    const vNext = current.v !== undefined ? current.v : current.vowelNext
    if (vowelNext && vNext !== undefined) {
      if (typeof vNext === 'object' && nextJungseong !== undefined) {
        const vowelChar =
          typeof nextJungseong === 'number'
            ? String.fromCodePoint(nextJungseong)
            : nextJungseong
        const compatVowel = jamoToCompat.get(vowelChar) || vowelChar
        if (vNext[vowelChar] !== undefined) {
          current = vNext[vowelChar]
          continue
        }
        if (vNext[compatVowel] !== undefined) {
          current = vNext[compatVowel]
          continue
        }
        if (vNext.d !== undefined) {
          current = vNext.d
          continue
        }
        if (vNext.default !== undefined) {
          current = vNext.default
          continue
        }
      }
      current = vNext
      continue
    }

    if (consonantNext || consonantPrev) {
      const char = String.fromCodePoint(consonantNext || consonantPrev)
      const compat = jamoToCompat.get(char) || char

      const target = current[char] !== undefined ? current[char] : current[compat]
      if (target !== undefined) {
        if (typeof target === 'object' && nextJungseong !== undefined) {
          const vowelChar =
            typeof nextJungseong === 'number'
              ? String.fromCodePoint(nextJungseong)
              : nextJungseong
          const compatVowel = jamoToCompat.get(vowelChar) || vowelChar
          if (target[vowelChar] !== undefined) {
            current = target[vowelChar]
            continue
          }
          if (target[compatVowel] !== undefined) {
            current = target[compatVowel]
            continue
          }
          if (target.d !== undefined) {
            current = target.d
            continue
          }
          if (target.default !== undefined) {
            current = target.default
            continue
          }
        }
        current = target
        continue
      }
    }

    if (current.d !== undefined) {
      current = current.d
      continue
    }
    if (current.default !== undefined) {
      current = current.default
      continue
    }

    break
  }

  return typeof current === 'string' ? current : ''
}

const voicedJongseong = new Set([0x11ab, 0x11af, 0x11b7, 0x11bc])

export const syllableParser = method => (syllable, idx, word) => {
  const nextSyllable = idx + 1 < word.length ? word[idx + 1] : null
  const nextChoseong = nextSyllable ? nextSyllable[0] : undefined
  const nextJungseong = nextSyllable ? nextSyllable[1] : undefined
  const vowelNext = nextChoseong === 0x110b || nextChoseong === 'ᄋ'

  const prevSyllable = idx > 0 ? word[idx - 1] : null
  const consonantPrev =
    prevSyllable && prevSyllable[2] ? prevSyllable[2] : undefined

  // For MR: voiced if preceded by vowel (consonantPrev undefined) or voiced consonant
  const isVoiced =
    method === 'MR' &&
    idx > 0 &&
    (consonantPrev === undefined || voicedJongseong.has(consonantPrev))

  return syllable.map((jamo, jamoIdx) => {
    const rules = maps[jamoIdx].get(jamo)
    if (rules === undefined) return ''

    return resolveRoman(rules, {
      method,
      vowelNext: jamoIdx === 2 ? vowelNext : undefined,
      nextJungseong:
        jamoIdx === 2 ? nextJungseong : jamoIdx === 0 ? syllable[1] : undefined,
      consonantPrev: jamoIdx === 0 ? consonantPrev : undefined,
      consonantNext: jamoIdx === 2 ? nextChoseong : undefined,
      isVoiced: jamoIdx === 0 ? isVoiced : undefined
    })
  })
}
