const xmas = require('./xmas')
const { readFile } = require('../helpers/input-file-reader')

const input = readFile(`${__dirname}/input.txt`).split('\n').map(itm => +itm)

const invalidNumbers = xmas.findInvalidNumbers({ input, preambleLength: 25 })

console.log('Part 1 >>', invalidNumbers)


const [lower, upper] = xmas.findContiguousNumbersBoundaries({ input, number: 3199139634 })
console.log('Part 2 >>', lower + upper)
