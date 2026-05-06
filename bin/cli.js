#!/usr/bin/env node

import { romanize } from '../src/index.js'

const { argv } = process

const output = argv.slice(2).map(romanize).join(' ')

console.log(output)
