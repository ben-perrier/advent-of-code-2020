const seat = {
  
  TOTAL_ROWS: 128,

  TOTAL_COLUMNS: 8,

  /**
   * @param {string} ref: seat reference, e.g. 'BFFFBBFRRR'
   * @returns the seat id, e.g. 567
   */
  getId (ref) {
    return this.getRow(ref) * 8 + this.getColumn(ref)
  },

  /**
   * @param {string} ref: seat reference, e.g. 'BFFFBBFRRR'
   * @returns the seat row, e.g. 70
   */
  getRow (ref) {
    return ref.match(/[BF]+/)[0].split('').reduce((acc, itm, index) => {
      if (itm === 'F') return acc
      if (itm === 'B') return acc + (this.TOTAL_ROWS / Math.pow(2, index+1))
      return acc
    }, 0)
  },

  /**
   * @param {string} ref: seat reference, e.g. 'BFFFBBFRRR'
   * @returns the seat column, e.g. 7
   */
  getColumn (ref) {
    return ref.match(/[LR]+/)[0].split('').reduce((acc, itm, index) => {
      if (itm === 'L') return acc
      if (itm === 'R') return acc + (this.TOTAL_COLUMNS / Math.pow(2, index+1))
    }, 0)
  },

  /**
   * @param {Array} allocatedSeats: list of allocated seat ids
   * @returns free seats which are not in the allocated seat list
   */
  getFreeSeats (allocatedSeats) {
    const max = Math.max(...allocatedSeats)
    const set = new Set(allocatedSeats)
    return new Array(max+1).fill().reduce((acc, _, index) => {
      if (!set.has(index)) acc.push(index)
      return acc
    }, [])
  }
}

module.exports = seat