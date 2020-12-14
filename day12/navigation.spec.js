const { Ship } = require('./navigation')

describe('Ship', () => {
  describe('turnShip ', () => {
    it('should turn ship accordingly', () => {
      const ship = new Ship(0) // Start with a ship facing north
      expect(ship.turnShip('R', 0).orientation).toBe(0)
      expect(ship.turnShip('R', 90).orientation).toBe(90)
      expect(ship.turnShip('R', 180).orientation).toBe(270)
      expect(ship.turnShip('R', 270).orientation).toBe(180)
      expect(ship.turnShip('L', 0).orientation).toBe(180)
      expect(ship.turnShip('L', 90).orientation).toBe(90)
      expect(ship.turnShip('L', 180).orientation).toBe(270)
      expect(ship.turnShip('L', 270).orientation).toBe(0)
    })
  })

  describe('moveShipTowardsCardinal', () => {
    it('sould move ship with cardinals accordingly', () => {
      const ship = new Ship(0)
      expect(ship.moveShipTowardsCardinal('N', 10)).toMatchObject({ x: 0, y: 10})
      expect(ship.moveShipTowardsCardinal('S', 20)).toMatchObject({ x: 0, y: -10})
      expect(ship.moveShipTowardsCardinal('E', 10)).toMatchObject({ x: 10, y: -10})
      expect(ship.moveShipTowardsCardinal('W', 20)).toMatchObject({ x: -10, y: -10})
    })
  })

  describe('moveForward', () => {
    it('sould move ship with orientations accordingly', () => {
      const ship = new Ship(0)
      expect(ship.turnShip('R', 90).moveForward(10)).toMatchObject({ x: 10, y: 0})
      expect(ship.turnShip('R', 90).moveForward(10)).toMatchObject({ x: 10, y: -10})
      expect(ship.turnShip('R', 90).moveForward(10)).toMatchObject({ x: 0, y: -10})
      expect(ship.turnShip('R', 90).moveForward(10)).toMatchObject({ x: 0, y: 0})
      expect(ship.turnShip('L', 90).moveForward(10)).toMatchObject({ x: -10, y: 0})
      expect(ship.turnShip('L', 90).moveForward(10)).toMatchObject({ x: -10, y: -10})
      expect(ship.turnShip('L', 90).moveForward(10)).toMatchObject({ x: 0, y: -10})
      expect(ship.turnShip('L', 90).moveForward(10)).toMatchObject({ x: 0, y: 0})
    })
  })

  describe('moveShip', () => {
    it('moveShip it sould move ship accordingly', () => {
      const input = 'F10\nN3\nF7\nR90\nF11'.split('\n')
      const ship = new Ship(90).processInstructions(input)
      expect(ship.getManhattanDistance()).toBe(25)
    })
  })
})
