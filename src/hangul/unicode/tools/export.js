const { join } = require('path')
const { readdir, writeFile } = require('fs').promises

function convert () {
  return readdir(join(__dirname))
    .then(dir => dir.filter(fileName => fileName.startsWith('hangul')))
    .then(files => Promise.all(files.map(write)))
    .then(files => console.log('Done with\n -- ' + files.join('\n -- ')))
}

function write (fileName) {
  const data = require(join(__dirname, fileName))
  const outputFilePath = join(__dirname, '..', 'data', fileName + 'on')
  return writeFile(outputFilePath, JSON.stringify(data, null, 2)).then(
    () => outputFilePath
  )
}

convert()
