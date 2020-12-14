const { Ship } = require('./navigation.js')
const { readFile } = require('../helpers/input-file-reader')

const input = readFile(`${__dirname}/input.txt`).split('\n')

const part1 = new Ship(90).processInstructions(input).getManhattanDistance()

console.log('part1 >>>>>>>>>>>>>>', part1)