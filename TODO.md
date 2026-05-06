# Romaja Development TODO

These items are identified as high-value features for future releases (v0.4.0 and beyond).

## 1. Inverse Conversion (Romaja → Hangul)
- **Concept**: Convert Latin character sequences back into Hangul syllables.
- **Use Case**: Search bars, custom IMEs, and educational tools.
- **Technical Path**: Implement a state machine to map Latin chars to Jamo and use Unicode arithmetic composition logic to form syllables.

## 2. Word-Boundary Phonetics (Cross-word Liaison)
- **Concept**: Apply phonetic rules that occur across spaces (word boundaries).
- **Example**: Handling "n-insertion" or liaison between adjacent words in a sentence.
- **Technical Path**: Update the top-level `romanize` function to analyze context between split tokens.

## 3. Custom Override Dictionary
- **Concept**: Allow users to specify non-standard romanizations for specific words.
- **Example**: `"삼성" -> "Samsung"` (instead of the standard "Samseong").
- **Technical Path**: Add an `options.overrides` Map/Object that is checked before the rule engine runs.

## 4. Native ESM Support
- **Concept**: Provide `.mjs` exports for better compatibility with modern bundlers (Vite, Webpack 5+) and tree-shaking.
- **Technical Path**: Update build pipeline to generate dual CJS/ESM outputs.

## 5. Hanja Detection & Support
- **Concept**: Handle mixed Hangul/Hanja text.
- **Technical Path**: Identify CJK Unified Ideograph blocks and provide options to either skip or phonetically convert them to Hangul before romanization.
