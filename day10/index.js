const jolt = require('./jolt.js')
const { readFile } = require('../helpers/input-file-reader')

const input = readFile(`${__dirname}/input.txt`).split('\n').map(itm => +itm)

const counts = jolt.countDifferences(input)
