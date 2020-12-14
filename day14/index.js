const { initializationProgram } = require('./bits.js')
const { readFile } = require('../helpers/input-file-reader')

const input = readFile(`${__dirname}/input.txt`).split('\n')

const memory = initializationProgram.processInstructions(input)

const part1 = memory.reduce((acc, itm) => acc+itm, 0)

console.log('part1 >>>>>>>>>>>>>>', part1)

