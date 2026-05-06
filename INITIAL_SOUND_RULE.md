# The Initial Sound Rule (Dueum Beopchik - 두음법칙)

In the context of the `romaja` library, understanding the **Initial Sound Rule** is crucial for accurate linguistic mapping, especially when dealing with Hanja (Chinese characters).

## 1. The Core Concept
The Initial Sound Rule is a phonological constraint in the South Korean standard language. It states that certain sounds (specifically `ㄹ` and `ㄴ`) are difficult to pronounce at the beginning of a word and should be changed to a "lighter" sound.

## 2. Native Korean vs. Sino-Korean (Hanja)

### Native Korean Words
Native words are already written phonetically in standard South Korean orthography.
- **ㄹ (R/L):** Native Korean words **historically never started with the sound 'ㄹ'**. Therefore, no rule is needed to change them.
- **ㄴ (N):** Native words starting with 'ㄴ' (e.g., `나` - I, `너` - you) are **not** affected. We say "Na" and we write "나". We do not change it to "아".

### Sino-Korean (Hanja) Words
This is where the rule is strictly applied. Every Hanja has a "Dictionary Reading" (its base sound), but South Korean orthography requires us to change that reading if the character starts a word.

| Hanja | Dictionary Reading | Rule Applied (At Start) | Example |
| :--- | :--- | :--- | :--- |
| **女** (Woman) | 녀 (nyeon) | **여** (yeo) | **여**자 (yeoja) |
| **路** (Road) | 로 (ro) | **노** (no) | **노**변 (nobyeon) |
| **龍** (Dragon) | 룡 (ryong) | **용** (yong) | **용**궁 (yonggung) |

## 3. Implementation in Code

### Scenario A: Input is already Hangul (Current State)
If the user provides the string `여자`, the rule has already been applied by the person who typed it. Your library simply romanizes the `ㅇ` and `ㅕ` to get `yeoja`. **No special logic is required for direct Hangul romanization.**

*Note: In North Korea, they do NOT apply this rule in writing. They would write `녀자`. Our library would correctly romanize that as `nyeoja` without needing to know it's a "violation" of the South Korean rule.*

### Scenario B: Input is Hanja (Future Feature)
If you implement a `hanjaToHangul` feature, the code must perform a transformation step:
1. **Map:** Look up the Hanja in a dictionary. **女** returns `녀`.
2. **Detect:** Check if this Hanja is at the start of a word.
3. **Transform:** Apply the Initial Sound Rule logic (e.g., if `ㄴ` + `i/y` vowel, change `ㄴ` to `ㅇ`).
4. **Output:** Produce the string `여`.
5. **Romanize:** Pass `여` to the existing engine to get `yeo`.

## 4. Summary Table

| Feature | Native Korean | Sino-Korean (Hanja) |
| :--- | :--- | :--- |
| **Sound Origin** | Natural spoken language. | Imported from Chinese. |
| **Written Form** | Always phonetic. | Fixed base reading, phonetic correction at start. |
| **Library Logic** | Direct Romanization. | **Requires a Transformation Step** (Mapping -> Rule -> Roman). |
