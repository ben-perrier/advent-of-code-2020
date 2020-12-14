const { bits, masks } = require('./bits')

describe('bits', () => {
  describe.only('bitsToNumber', () => {
    it('should return the correct number for the bit string', () => {
      expect(bits.bitsToNumber('000000000000000000000000000001001001')).toBe(73)
      expect(bits.bitsToNumber('000000000000000000000000000000001011')).toBe(11)
    })
  })

  describe.only('numberToString', () => {
    it('should return the correct number for the bit string', () => {
      expect(bits.numberToString(11)).toBe('000000000000000000000000000000001011')
      expect(bits.numberToString(73)).toBe('000000000000000000000000000001001001')
    })
  })
})

describe('mask', () => {
  describe.only('applyToString', () => {
    it('should apply the mask to the string', () => {
      expect(masks.applyToString('000000000000000000000000000000001011', 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X')).toBe('000000000000000000000000000001001001')
    })
  })

  describe.only('applyToNumber', () => {
    it('should apply the mask to the number', () => {
      expect(masks.applyToNumber(11, 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X')).toBe(73)
    })
  })
})
