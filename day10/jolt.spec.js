const { orderAdapters } = require('./jolt')
const jolt = require('./jolt')

describe('jolt', () => {
  describe('orderAdapters', () => {
		it('should return all adapters ordered', () => {
			const input1 = '16\n10\n15\n5\n1\n11\n7\n19\n6\n12\n4'.split('\n').map(itm => +itm)
			const adapters1 = jolt.orderAdapters(input1)
			expect(adapters1).toEqual([1,4,5,6,7,10,11,12,15,16,19,22])
		})
	})

	// describe('countDifferences', () => {
	// 	it.only('should return the count of differences between adapters', () => {
	// 		const input1 = '16\n10\n15\n5\n1\n11\n7\n19\n6\n12\n4'.split('\n').map(itm => +itm)
	// 		const adapters1 = jolt.countDifferences(input1)
	// 		expect(adapters1).toEqual([0,7,0,5])

	// 		const input2 = '28,\n33,\n18,\n42,\n31,\n14,\n46,\n20,\n48,\n47,\n24,\n23,\n49,\n45,\n19,\n38,\n39,\n11,\n1,\n32,\n25,\n35,\n8,\n17,\n7,\n9,\n4,\n2,\n34,\n10,\n3'.split('\n').map(itm => +itm)
	// 		const adapters2 = jolt.countDifferences(input2)
	// 		expect(adapters2).toEqual([0,22,0,10])
	// 	})
  // })
  
  describe('getallArrangements', () =>{
    it('should returns all arrangements of adapters', () => {
      const input1 = '16\n10\n15\n5\n1\n11\n7\n19\n6\n12\n4'.split('\n').map(itm => +itm)
			const arrangements = jolt.getAllArragements(input1)
			expect(arrangements.length).toEqual(8)
    })
  })

  describe('isListComplete', () => {
    it('should tell whether a list is complete', () => {
      const orderedAdapters = [0,1,4,6,8,9,10]
      const completeList = [0,1,3,4,5,8,10]
      const incompleteList = [0,1,3,4,5,8]
      expect(jolt.isListComplete(completeList, orderedAdapters)).toBe(true)
      expect(jolt.isListComplete(incompleteList, orderedAdapters)).toBe(false)
    })
  })

  describe('buildUpListVariations', () => {
    it('should return as many new lists as variations of the next adapter', () => {
      const orderedAdapters = [0,1,4,6,8,9,10]
      const input = [0,1,4,6]
      const output = [[0,1,4,6,8], [0,1,4,6,9]]
      expect(jolt.buildUpListVariations(input, orderedAdapters)).toEqual(output)
    })
  })
  
})
