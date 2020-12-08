const declarations = require('./customs-declarations-processor')
const input = `abc

a
b
c

ab
ac

a
a
a
a

b

`

describe('declarations', () => {
  describe('countPositivelyAnsweredByGroup', () => {
    it('should calculate the number of positively answered questions per group', () => {
      const output = declarations.countPositivelyAnsweredByGroup(input)
      expect(output).toEqual([3,3,3,1,1,0])
      const sum = output.reduce((acc, itm) => acc + itm, 0) 
      expect(sum).toEqual(11)
    })
  })

  describe('getRow', () => {
    it('should calculate the number of questions answered positively by all per group', () => {
      const output = declarations.countPositivelyAnsweredByEveryoneByGroups(input)
      const sum = output.reduce((acc, itm) => acc + itm, 0) 
      expect(output).toEqual([3,0,1,1,1,0])
      expect(sum).toEqual(6)
    })
  })
})