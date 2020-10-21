#!/usr/bin/env node

const { romanize } = require('./romanize')

const { argv } = process

const output = argv
  .slice(2)
  .map(romanize)
  .join(' ')

console.log(output)
