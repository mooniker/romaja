# Romaja Development TODO

These items are identified as high-value features for future releases (v1.0.0 and beyond).

## 1. Inverse Conversion (Romaja → Hangul)
- **Concept**: Convert Latin character sequences back into Hangul syllables.
- **Use Case**: Search bars, custom IMEs, and educational tools.
- **Technical Path**: Implement a state machine to map Latin chars to Jamo and use Unicode arithmetic composition logic to form syllables.

## 2. Word-Boundary Phonetics (Cross-word Liaison)
- **Concept**: Apply phonetic rules that occur across spaces (word boundaries).
- **Example**: Handling "n-insertion" or liaison between adjacent words in a sentence (e.g., `꽃이` vs `꽃밭`).
- **Technical Path**: Update the top-level `romanize` function to analyze context between split tokens.

## 3. Comprehensive Hanja Support (Optional Package)
- **Concept**: The current implementation handles the ~120 most common Hanja. A larger dictionary (~5,000 chars) would be better for formal documents.
- **Technical Path**: Create a separate package `@romaja/hanja` to keep the core library small.

## 4. North Korean Orthography Mode
- **Concept**: Add a toggle to support North Korean spelling conventions (which don't apply the Initial Sound Rule in writing).
- **Technical Path**: Add a global `dialect` option to the engine.
