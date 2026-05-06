import {
  decomposeHangulChar,
  decomposeHangul
} from './decompose.js'

const hangulHexCases = {
  훈: [0x1112, 0x116e, 0x11ab],
  민: [0x1106, 0x1175, 0x11ab],
  정: [0x110c, 0x1165, 0x11bc],
  음: [0x110b, 0x1173, 0x11b7],
  가: [0x1100, 0x1161],
  나: [0x1102, 0x1161],
  다: [0x1103, 0x1161],
  라: [0x1105, 0x1161],
  마: [0x1106, 0x1161],
  바: [0x1107, 0x1161],
  사: [0x1109, 0x1161],
  아: [0x110b, 0x1161],
  자: [0x110c, 0x1161],
  차: [0x110e, 0x1161],
  카: [0x110f, 0x1161],
  타: [0x1110, 0x1161],
  파: [0x1111, 0x1161],
  하: [0x1112, 0x1161],
  까: [0x1101, 0x1161],
  따: [0x1104, 0x1161],
  빠: [0x1108, 0x1161],
  싸: [0x110a, 0x1161],
  짜: [0x110d, 0x1161],
  거: [0x1100, 0x1165],
  너: [0x1102, 0x1165],
  더: [0x1103, 0x1165],
  러: [0x1105, 0x1165],
  머: [0x1106, 0x1165],
  버: [0x1107, 0x1165],
  서: [0x1109, 0x1165],
  어: [0x110b, 0x1165],
  저: [0x110c, 0x1165],
  처: [0x110e, 0x1165],
  커: [0x110f, 0x1165],
  터: [0x1110, 0x1165],
  퍼: [0x1111, 0x1165],
  허: [0x1112, 0x1165]
}

describe('decomposeHangulChar', () => {
  Object.entries(hangulHexCases).forEach(([hangul, charCodes]) => {
    test(`should decompose ${hangul} to character codes [${charCodes.join(
      ','
    )}]`, () => {
      expect(decomposeHangulChar(hangul)).toStrictEqual(charCodes)
    })

    test(`should decompose code point ${hangul.codePointAt(
      0
    )} (${hangul}) to character codes [${charCodes.join(',')}]`, () => {
      expect(decomposeHangulChar(hangul.codePointAt(0))).toStrictEqual(
        charCodes
      )
    })
  })
})

describe('decomposeHangul (word)', () => {
  test('should decompose 훈민정음', () => {
    expect(decomposeHangul('훈민정음')).toStrictEqual([
      [0x1112, 0x116e, 0x11ab],
      [0x1106, 0x1175, 0x11ab],
      [0x110c, 0x1165, 0x11bc],
      [0x110b, 0x1173, 0x11b7]
    ])
  })
})
