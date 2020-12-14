const buses = require('./buses.js')
const { readFile } = require('../helpers/input-file-reader')

const [timestamp, notes] = readFile(`${__dirname}/input.txt`).split('\n')

const [nextBus, waitInMins] = buses.getNextBus(timestamp, notes)[0]

console.log('part1 >>>>>>>>>>>>>>', nextBus * -waitInMins)