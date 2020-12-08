const rules = require('./rules.js')
const { readFile } = require('../helpers/input-file-reader')

const rulesInput = readFile(`${__dirname}/input.txt`).split('\n')

const part1 = rules.getSuitableBags({ item: 'shiny gold bag', rulesInput })//.map(itm => itm.split(' ')[1]).reduce((acc, itm) => acc.add(itm), new Set).size

console.log('part1', part1.length)