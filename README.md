# `romaja` (로마자) [![npm version](https://badge.fury.io/js/romaja.svg)](https://badge.fury.io/js/romaja)

> A high-performance, linguistically accurate Korean (Hangeul) romanization engine.

```sh
npm install --global romaja
romaja "안녕하십니까?"
# "annyeonghasimnikka?"
```

## Features

- **High Performance:** Optimized engine capable of processing >1,000,000 characters per second.
- **Phonetically Accurate:** Implements Revised Romanization (RR) standards including:
  - **Assimilation:** `백마` → `baengma`, `신라` → `silla`
  - **Aspiration:** `좋다` → `jota`, `먹히다` → `meokida`
  - **Palatalization:** `해돋이` → `haedoji`, `같이` → `gachi`
- **Lightweight:** Zero dependencies and a tiny 8.5KB minified footprint.
- **Ruby Support:** Generate phonetic annotations for educational applications.
- **Unicode Standard:** Based on conjoining Jamo logic for modern and compatible Hangul.

## Usage

### Node.js

```javascript
const { romanize } = require('romaja')

// Basic romanization
console.log(romanize('국어')) // "gugeo"

// With phonetic rules (Aspiration)
console.log(romanize('좋다')) // "jota"

// Ruby annotations
const ruby = romanize('루비', { ruby: true })
// [{ text: 'rubi', ruby: '루비' }]
```

### CLI

```sh
romaja "국어의 로마자 표기법"
# "gugeoui romaja pyogibeop"
```

## License

MIT
