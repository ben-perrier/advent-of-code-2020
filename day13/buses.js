const buses = {
  /**
   * Lists next buses sorted by waiting time ascending, in the format [[busId, waitingTime]], e.g. [[59, -5]]
   * @param {*} timestamp: time of looking, e.g. 939
   * @param {*} notes: available buses, in the format: 7,13,x,x,59,x,31,19
   */
  getNextBus (timestamp, notes) {
    // next buses in format: { 'busid': -10 } -10 being the number of minutes to wait till the next bus
    const nextBuses = notes.split(',').map(itm => +itm).filter(itm => !isNaN(itm))
    .reduce((acc, bus) => {
      return {...acc, [bus]: ((timestamp) % bus)-bus }
    }, {})
    // Returns list of bus ids sorted by ascending wait in minutes, the first one being the next bus
    return Object.entries(nextBuses).sort(([aBusId, aWait], [bBusId, bWait]) => bWait - aWait)
  }
}

module.exports = buses