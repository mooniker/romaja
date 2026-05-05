const jamoData = require('./jamo')
const maps = [
  createJamoMap(jamoData[0]),
  createJamoMap(jamoData[1]),
  createJamoMap(jamoData[2])
]
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

function resolveRoman(rules, params) {
  let current = rules
  const { method, vowelNext, nextJungseong, consonantNext, consonantPrev } =
    params

  while (
    typeof current !== 'string' &&
    current !== null &&
    current !== undefined
  ) {
    if (current.roman !== undefined) {
      current = current.roman
      continue
    }

    if (method && current[method] !== undefined) {
      current = current[method]
      continue
    }

    if (vowelNext && current.vowelNext !== undefined) {
      if (
        typeof current.vowelNext === 'object' &&
        nextJungseong !== undefined
      ) {
        const vowelChar =
          typeof nextJungseong === 'number'
            ? String.fromCodePoint(nextJungseong)
            : nextJungseong
        const compatVowel = jamoToCompat.get(vowelChar) || vowelChar
        if (current.vowelNext[vowelChar] !== undefined) {
          current = current.vowelNext[vowelChar]
          continue
        }
        if (current.vowelNext[compatVowel] !== undefined) {
          current = current.vowelNext[compatVowel]
          continue
        }
        if (current.vowelNext.default !== undefined) {
          current = current.vowelNext.default
          continue
        }
      }
      current = current.vowelNext
      continue
    }

    if (consonantNext || consonantPrev) {
      const char = String.fromCodePoint(consonantNext || consonantPrev)
      const compat = jamoToCompat.get(char) || char

      if (current[char] !== undefined) {
        if (typeof current[char] === 'object' && nextJungseong !== undefined) {
          const vowelChar =
            typeof nextJungseong === 'number'
              ? String.fromCodePoint(nextJungseong)
              : nextJungseong
          const compatVowel = jamoToCompat.get(vowelChar) || vowelChar
          if (current[char][vowelChar] !== undefined) {
            current = current[char][vowelChar]
            continue
          }
          if (current[char][compatVowel] !== undefined) {
            current = current[char][compatVowel]
            continue
          }
          if (current[char].default !== undefined) {
            current = current[char].default
            continue
          }
        }
        current = current[char]
        continue
      }
      if (current[compat] !== undefined) {
        if (
          typeof current[compat] === 'object' &&
          nextJungseong !== undefined
        ) {
          const vowelChar =
            typeof nextJungseong === 'number'
              ? String.fromCodePoint(nextJungseong)
              : nextJungseong
          const compatVowel = jamoToCompat.get(vowelChar) || vowelChar
          if (current[compat][vowelChar] !== undefined) {
            current = current[compat][vowelChar]
            continue
          }
          if (current[compat][compatVowel] !== undefined) {
            current = current[compat][compatVowel]
            continue
          }
          if (current[compat].default !== undefined) {
            current = current[compat].default
            continue
          }
        }
        current = current[compat]
        continue
      }
    }

    if (current.default !== undefined) {
      current = current.default
      continue
    }

    break
  }

  return typeof current === 'string' ? current : ''
}

const syllableParser = method => (syllable, idx, word) => {
  const nextSyllable = idx + 1 < word.length ? word[idx + 1] : null
  const nextChoseong = nextSyllable ? nextSyllable[0] : undefined
  const nextJungseong = nextSyllable ? nextSyllable[1] : undefined
  const vowelNext = nextChoseong === 0x110b || nextChoseong === 'ᄋ'

  const prevSyllable = idx > 0 ? word[idx - 1] : null
  const consonantPrev =
    prevSyllable && prevSyllable[2] ? prevSyllable[2] : undefined

  return syllable.map((jamo, jamoIdx) => {
    const rules = maps[jamoIdx].get(jamo)
    if (rules === undefined) return ''

    return resolveRoman(rules, {
      method,
      vowelNext: jamoIdx === 2 ? vowelNext : undefined,
      nextJungseong:
        jamoIdx === 2 ? nextJungseong : jamoIdx === 0 ? syllable[1] : undefined,
      consonantPrev: jamoIdx === 0 ? consonantPrev : undefined,
      consonantNext: jamoIdx === 2 ? nextChoseong : undefined
    })
  })
}

module.exports = { syllableParser }
