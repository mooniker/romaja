// The precomposed hangul syllables in the Hangul Syllables block in Unicode are algorithmically defined, using the following formula:
// [(initial) × 588 + (medial) × 28 + (final)] + 44032

const { HANGUL_SYLLABLE_BLOCK } = require("./constants");
const { START } = HANGUL_SYLLABLE_BLOCK;

const { initialConsonants, medialVowels, finalConsonants } = require("./jamo");

const getInitialJamoIdx = syllable =>
  Math.floor((syllable.charCodeAt(0) - START) / 588);

const getInitialJamo = syllable =>
  initialConsonants[getInitialJamoIdx(syllable)];

const getMedialJamoIdx = syllable => {
  const hangulCode = syllable.charCodeAt(0) - START;
  const initialJamo = getInitialJamoIdx(syllable);
  const medial = Math.floor((hangulCode - 588 * initialJamo) / 28);
  return medial;
};

const getMedialJamo = syllable => medialVowels[getMedialJamoIdx(syllable)];

const getFinalJamoIdx = syllable => {
  const hangulCode = syllable.charCodeAt(0) - START;
  const initial = getInitialJamoIdx(syllable);
  const medial = getMedialJamoIdx(syllable);
  return hangulCode - 588 * initial - 28 * medial;
};

const getFinalJamo = syllable => {
  return finalConsonants[getFinalJamoIdx(syllable)];
};

const decomposeSyllable = syllable => {
  const initial = getInitialJamo(syllable);
  const medial = getMedialJamo(syllable);
  const final = getFinalJamo(syllable);
  return final ? [initial, medial, final] : [initial, medial];
};

const decompose = word => word.split("").map(decomposeSyllable);

module.exports = {
  getInitialJamo,
  getMedialJamo,
  getFinalJamo,
  decomposeSyllable,
  decompose
};