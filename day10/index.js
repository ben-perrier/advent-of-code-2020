const jolt = require('./jolt.js')
const { readFile } = require('../helpers/input-file-reader')

const input = readFile(`${__dirname}/input.txt`).split('\n').map(itm => +itm)

const [diff0, diff1, diff2, diff3] = jolt.countDifferences(input)

console.log('part 1 >>>>', diff1 * diff3)

const part2 = jolt.getAllArragements(input)

console.log('part 2 >>>>', part2)