# Romanization vs. Phonetic Transcription

This is a critical distinction for the roadmap of the `romaja` library. It determines whether we are strictly implementing a **Standard** or building a **Phonetic Engine**.

## 1. The Official Revised Romanization (RR) Standard
The **Revised Romanization of Korean (2000)** is the official standard in South Korea. Its primary goal is to provide a consistent way to write Korean words (place names, people, cultural items) in the Latin alphabet.

### Does RR apply across word boundaries?
**Generally, No.**
The RR standard is designed to be applied to **orthographic units** (words separated by spaces). 
- If the Korean text has a space: `꽃 아래`
- The RR output should preserve that boundary: `kkot arae`
- Even though we *say* "kkodarae", writing it that way in RR would make it very difficult for someone to map the Latin back to the original Korean words.

### Where does it apply?
RR applies phonetic rules **within** a single block of text (a word).
- `종로` (Jongno) - Rule applied.
- `신라` (Silla) - Rule applied.
- `좋다` (jota) - Rule applied.

## 2. Phonetic Transcription (The "Speech" Model)
If we were to implement Word-Boundary Phonetics (e.g., `꽃 아래` $\to$ `kkodarae`), we would be moving into **Phonetic Transcription** (like IPA or custom pronunciation guides).

### Use Cases for Phonetic Transcription:
- **Language Learning:** Helping students understand how a sentence *actually* sounds.
- **Text-to-Speech (TTS):** Pre-processing text for a computer to read aloud.
- **Singing/Lyrics:** Providing a "singable" version of a song.

## 3. Linguistic Verdict for `romaja`

If your goal is to be the **"Gold Standard implementation of South Korea's Revised Romanization"**:
- **You should NOT apply rules across word boundaries.**
- The current behavior (processing word-by-word) is actually more "correct" according to the official MCST (Ministry of Culture, Sports and Tourism) standard.

If your goal is to provide a **"Korean Phonetic Toolkit"**:
- Then word-boundary logic is a powerful "Pro" feature that differentiates you from other standard-only libraries.

## 4. Recommendation
I suggest we keep the **Default** behavior strictly aligned with the RR standard (no cross-word liaison). 

If we implement word-boundary phonetics, it should be an **explicit, opt-in feature**:
```javascript
romanize("꽃 아래"); // "kkot arae" (Official RR Standard)
romanize("꽃 아래", { transcribePronunciation: true }); // "kkodarae" (Linguistic Phonetics)
```

This preserves the library's reputation for being "Standard Compliant" while adding value for advanced users.
