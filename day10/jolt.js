const jolt = {
  orderAdapters (input) {
		const deviceJoltage = Math.max(...input)+3
		return input.concat(deviceJoltage).sort((a,b)=>a-b)
	},
  
  countDifferences (input, adapter = 0) {
		const adapters = this.orderAdapters(input)
		const list = [adapter].concat(adapters)
		
		return list.reduce((acc, itm, index) => {
			if (list[index+1] >= 0) {
				const difference = list[index+1] - itm
				acc[difference] = acc[difference] + 1
			}
			return acc
		}, new Array(4).fill(0))
  },
  
  getAllArragements (input) {
    const orderedAdapters = this.orderAdapters(input)
    
    const buildLists = (lists) => {
      if (lists.every(list => this.isListComplete(list, orderedAdapters))) return lists
      
      lists = lists.reduce((acc, list) => {
        list = this.buildUpListVariations(list, orderedAdapters)
        return acc.concat(list)
      }, [])
      return buildLists(lists)
    }

    return buildLists([[orderedAdapters[0]]])
  },

  /**
   * Takes a list and returns an array of lists encompassing variations for the next adapter
   */
  buildUpListVariations (list, orderedAdapters) {
    if (this.isListComplete(list, orderedAdapters)) return [list]
    const lastAdapter = orderedAdapters[orderedAdapters.indexOf(list.slice(-1)[0])]
    const nextAdapters = orderedAdapters.filter(itm => itm > lastAdapter && itm <= lastAdapter + 3)
    return nextAdapters.map(itm => list.concat(itm))
  },

  isListComplete (list, orderedAdapters) {
    if(!Array.isArray(list)) throw new Error('yolo')
    return list.slice(-1)[0] === orderedAdapters.slice(-1)[0]
  },

  getVariations (nextAdapters) {
    if (nextAdapters.length === 1) return [nextAdapters]
  }
}

module.exports = jolt