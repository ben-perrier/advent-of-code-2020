const { Ship } = require('./navigation')

describe('Ship', () => {
  describe('turnShip ', () => {
    it('should turn ship accordingly', () => {
      const ship = new Ship(0) // Start with a ship facing north
      expect(ship.turnShip('R', 0).direction).toBe(0)
      expect(ship.turnShip('R', 90).direction).toBe(90)
      expect(ship.turnShip('R', 180).direction).toBe(270)
      expect(ship.turnShip('R', 270).direction).toBe(180)
      expect(ship.turnShip('L', 0).direction).toBe(180)
      expect(ship.turnShip('L', 90).direction).toBe(90)
      expect(ship.turnShip('L', 180).direction).toBe(270)
      expect(ship.turnShip('L', 270).direction).toBe(0)
    })
  })

  describe('moveShipWithCardinals', () => {
    it('sould move ship with cardinals accordingly', () => {
      const ship = new Ship(0)
      expect(ship.moveShipWithCardinals('N', 10)).toMatchObject({ x: 0, y: 10})
      expect(ship.moveShipWithCardinals('S', 20)).toMatchObject({ x: 0, y: -10})
      expect(ship.moveShipWithCardinals('E', 10)).toMatchObject({ x: 10, y: -10})
      expect(ship.moveShipWithCardinals('W', 20)).toMatchObject({ x: -10, y: -10})
    })
  })

  describe('moveForward', () => {
    it('sould move ship with directions accordingly', () => {
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