#!/usr/bin/env node

const romanize = require('../src')

const { argv } = process

const output = argv
  .slice(2)
  .map(romanize)
  .join(' ')

console.log(output)
