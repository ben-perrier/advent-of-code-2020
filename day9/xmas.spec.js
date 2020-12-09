const xmas = require('./xmas')

describe('xmas', () => {
  describe('findInvalidNumbers', () => {
    it('should return invalid numbers', () => {
      const input = [35,
        20,
        15,
        25,
        47,
        40,
        62,
        55,
        65,
        95,
        102,
        117,
        150,
        182,
        127,
        219,
        299,
        277,
        309,
        576]
      const preambleLength = 5
      expect(xmas.findInvalidNumbers({ input, preambleLength })).toEqual([127])
    })
  })

  it('should return the first invalid number', () => {
    const input = [35,
      20,
      15,
      25,
      47,
      40,
      62,
      55,
      65,
      95,
      102,
      117,
      150,
      182,
      127,
      219,
      299,
      277,
      309,
      576]
    const preambleLength = 5
    expect(xmas.findInvalidNumbers({ input, preambleLength })).toEqual([127])
  })

  it('should find valid and invalid numbers', () => {
    const input_v = [35,
      20,
      15,
      25,
      47]
    expect(xmas.isValid(input_v, 40)).toBe(true)
    const input_i = [95,
      102,
      117,
      150,
      182,]
    expect(xmas.isValid(input_i, 127)).toBe(false)
  })
})