class Ship {
  
  constructor (orientation) {
    this.orientation = orientation
    this.x = 0
    this.y = 0
  }

  processInstructions (input) {
    input.forEach(instruction => this.processInstruction(instruction))
    return this
  }

  processInstruction (instruction) {
    const [_, letter, number] = instruction.match(/([A-Z])([0-9]+)/)
    if (['E', 'W', 'S', 'N', 'F'].includes(letter)) return this.moveShip(letter, +number)
    if (['R', 'L'].includes(letter)) return this.turnShip(letter, +number)
    throw Error(`instruction ${letter} cannot be processed`)
  }

  /**
   * Rotates the ship
   * @param {*} degrees: Turning angle
   * @param {*} side: 'R' for right or 'L' for left
   */
  turnShip (side, degrees) {
    if (!side) throw Error('need side to turn')
    this.orientation = (this.orientation + (side === 'L' ? (360 - degrees) : degrees )) % 360
    return this
  }

  /**
   * Processes move ship instructions
   */
  moveShip (direction, distance) {
    if (['E', 'W', 'S', 'N'].includes(direction)) return this.moveShipTowardsCardinal (direction, distance)
    if (['F'].includes(direction)) return this.moveForward (distance)
    throw Error(`instruction ${direction} cannot be processed`)
  }

  /**
   * Moves the ship forward by the desired distance
   * @param {*} cardinal: N, E, S or W
   * @param {*} distance: desired distance
   */
  moveShipTowardsCardinal (cardinal, distance) {
    this.x += cardinal === 'E' ? distance : cardinal === 'W' ? -distance : 0
    this.y += cardinal === 'N' ? distance : cardinal === 'S' ? -distance : 0
    return this
  }

  /**
   * Moves the ship forward by the desired distance
   */
  moveForward (distance) {
    const degreeToCardinal = { 0: 'N', 90: 'E', 180: 'S', 270: 'W'}
    const cardinal = degreeToCardinal[this.orientation]
    return this.moveShipTowardsCardinal(cardinal, distance)
  }

  getManhattanDistance () {
    return Math.abs(this.x) + Math.abs(this.y)
  }

}

class Part2Ship extends Ship {
  constructor (x, y) {
    super(90)
    this.x = 0
    this.y = 0
    this.wayPoint = {
      x, 
      y
    }
  }

}


module.exports = { Ship }