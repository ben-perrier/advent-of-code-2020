const { passportFileProcessor } = require('../passportValidator')
const { readFile } = require('../../helpers/input-file-reader.js')

describe('passportFileProcessor', () => {
  it('should detect 2 valid passports', () => {
    const input = readFile(`${__dirname}/input.txt`).split('\n')
    const validPassports = passportFileProcessor(input)
    expect(validPassports.length).toBe(2)
  })
})