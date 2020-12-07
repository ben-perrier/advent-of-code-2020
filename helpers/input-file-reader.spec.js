const { readFile } = require('./input-file-reader')

describe('readFile', () => {
  describe('getRow', () => {
    it('should calculate the correct row', () => {
      const output = readFile(`${__dirname}/input.txt`)
      expect(output).toBe(`abc\ndef\n\nghi\njkl`)
    })
  })
})