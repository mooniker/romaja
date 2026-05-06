# Word-Boundary Phonetics (Cross-word Liaison)

In Korean linguistics, sound shifts don't just happen inside a single word. In natural speech, the end of one word often influences the beginning of the next. This is known as **Liaison** or **Inter-word Assimilation**.

## 1. Key Linguistic Phenomena

### A. Liaison (Yeoneum - 연음)
When a word ends in a consonant and the next word starts with a vowel (the silent `ㅇ`), the final consonant often "slides over" to the next word.
- **Example**: `꽃 아래` (Below the flower)
- **Standard Pronunciation**: `꼬다래` (kkodarae)
- **Current Romaja**: `kkot arae`
- **With Liaison**: `kkodarae`

### B. N-Insertion (Nieun Chumga - ㄴ 첨가)
When a word ends in a consonant and the following word starts with `이, 야, 여, 요, 유`, an `n` sound is often inserted.
- **Example**: `잠을 못 이뤄` (Can't sleep)
- **Pronunciation**: `못 니뤄` (mon-nirwo)
- **With N-insertion**: `mot nirwo` (or `monirwo` depending on assimilation)

### C. Cross-word Nasalization (Bieumhwa - 비음화)
A final plosive (`ㄱ, ㄷ, ㅂ`) becomes a nasal (`ㅇ, ㄴ, ㅁ`) if the next word starts with a nasal.
- **Example**: `국물` (Inside word: `gungmul`) vs `국 먹어` (Across words)
- **Pronunciation**: `궁 머거` (gung meogeo)
- **Current Romaja**: `guk meogeo`

---

## 2. Current Architecture vs. The Challenge

Currently, the `romanize` function is **stateless** between words:
1. It identifies a Hangul block.
2. It passes that single block to `romanizeWord`.
3. It moves to the next block.

Because `romanizeWord` doesn't know what comes before or after it, it cannot apply these "Natural Speech" rules.

---

## 3. Implementation Strategy

To support this in `v0.7.0`, we would need to shift from a "Search and Replace" model to a **"Tokenize and Buffer"** model.

### Step 1: Tokenization
Instead of `.replace()`, we split the entire string into tokens (words, spaces, punctuation).
```javascript
// Example: "꽃 아래"
const tokens = ["꽃", " ", "아래"];
```

### Step 2: Contextual Analysis
We iterate through the tokens. When we reach `꽃`, we look ahead:
1. Is the next token whitespace? **Yes**.
2. Is the token after that a Hangul word starting with a vowel? **Yes** (`아래`).
3. **Trigger**: Apply Liaison rule.

### Step 3: Virtual Jongseong/Choseong
The `syllableParser` would need to be updated to accept "Context" parameters:
- `consonantNextOverride`: The consonant sound starting the *next* word.
- `vowelNextOverride`: Whether the *next* word starts with a vowel.

### Step 4: Toggle Option
Since these rules are for **phonetic transcription** (how it sounds) rather than **orthographic transcription** (how it's spelled), this should be an optional flag:
```javascript
romanize("꽃 아래", { naturalSpeech: true }); // "kkodarae"
```

---

## 4. Why this is the "v1.0" Tier
Implementing this correctly requires a sophisticated look-ahead engine. It transforms the library from a simple converter into a true **speech-synthesis-ready** phonetic engine.
