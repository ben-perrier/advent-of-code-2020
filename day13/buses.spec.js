const buses = require('./buses')

describe('buses', () => {
  describe('getNextBus ', () => {
    it('should figure out what the next bus is', () => {
      const [timestamp, notes] = `939\n7,13,x,x,59,x,31,19`.split('\n')
      expect(buses.getNextBus(timestamp, notes)[0]).toBe('59')
    })
  })
})
