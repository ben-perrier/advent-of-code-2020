const { passportFileProcessor } = require('./passportValidator')
const { readFile } = require('../helpers/input-file-reader.js')

const input = readFile(`${__dirname}/input.txt`).split('\n')

const validPassports = passportFileProcessor(input)

console.log('validPassports', validPassports.length)