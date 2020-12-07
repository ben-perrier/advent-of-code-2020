const seat = require('./seat')

describe('seat', () => {
  describe('getRow', () => {
    it('should calculate the correct row', () => {
      expect(seat.getRow('BFFFBBFRRR')).toBe(70)
      expect(seat.getRow('FFFBBBFRRR')).toBe(14)
      expect(seat.getRow('BBFFBBFRLL')).toBe(102)
    })
  })

  describe('getColumn', () => {
    it('should calculate the correct column', () => {
      expect(seat.getColumn('BFFFBBFRRR')).toBe(7)
      expect(seat.getColumn('FFFBBBFRRR')).toBe(7)
      expect(seat.getColumn('BBFFBBFRLL')).toBe(4)
    })
  })

  describe('getId', () => {
    it('should calculate the correct id', () => {
      expect(seat.getId('BFFFBBFRRR')).toBe(567)
      expect(seat.getId('FFFBBBFRRR')).toBe(119)
      expect(seat.getId('BBFFBBFRLL')).toBe(820)
    })
  })

  describe('getFreeSeats', () => {
    it('should return free seats left', () => {
      expect(seat.getFreeSeats([5,4,2,1,0])).toEqual([3])
    })
  })
})