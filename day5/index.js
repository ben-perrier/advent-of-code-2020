const { readFile } = require('../helpers/input-file-reader.js')
const seat = require('./seat')

const input = readFile(`${__dirname}/input.txt`).split('\n')

const allSeats = input.map(itm => seat.getId(itm))

const highestSeatId = Math.max(...allSeats)

console.log({ highestSeatId })

const freeSeats = seat.getFreeSeats(allSeats)

const mySeat = freeSeats.slice(-1)[0]

console.log({ mySeat })
