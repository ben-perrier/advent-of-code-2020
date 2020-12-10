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
	}
}

module.exports = jolt