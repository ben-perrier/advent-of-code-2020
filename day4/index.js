const { passportFileProcessor } = require('./passportValidator')
const { readFile } = require('../helpers/fileReader')

const input = readFile(`${__dirname}/input.txt`)

const validPassports = passportFileProcessor(input)

console.log('validPassports', validPassports.length)