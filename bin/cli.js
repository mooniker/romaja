#!/usr/bin/env node

const { join } = require('path')
const { romanize } = require(join(__dirname, '..', 'dist', 'main'))

const { argv } = process

const output = argv
  .slice(2)
  .map(romanize)
  .join(' ')

console.log(output)
