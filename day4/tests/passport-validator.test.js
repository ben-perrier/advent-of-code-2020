const { passportFileProcessor } = require('../passportValidator')
const { readFile } = require('../../helpers/fileReader')

describe('passportFileProcessor', () => {
  it('should detect 2 valid passports', () => {
    const input = readFile(`${__dirname}/input.txt`)
    const validPassports = passportFileProcessor(input)
    expect(validPassports.length).toBe(2)
  })
})