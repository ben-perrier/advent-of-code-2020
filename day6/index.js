const declarations = require('./customs-declarations-processor')
const { readFile } = require('../helpers/input-file-reader')

const input = readFile(`${__dirname}/input.txt`)

const counts = declarations.countPositivelyAnsweredByGroup(input)

console.log('counts >> ', counts)

const part1 = counts.reduce((acc, itm) => acc + itm, 0)

console.log('part1 >> ', part1)

const countAllPositives = declarations.countPositivelyAnsweredByEveryoneByGroups(input)

console.log('countAllPositives >> ', countAllPositives)

const part2 = countAllPositives.reduce((acc, itm) => acc + itm, 0)

console.log('part2 >> ', part2)
