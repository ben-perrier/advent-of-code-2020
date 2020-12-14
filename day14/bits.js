const initializationProgram = {
  
  processInstructions (instructions) {
    let mask = ''
    let memory = new Array()
    instructions.map(instruction => {
      if (instruction.startsWith('mask')) return mask = instruction.split(' = ')[1]
      if (instruction.startsWith('mem')) this.processMemoryInstruction(instruction, mask, memory)
    })
    return memory
  },

  processMemoryInstruction (instruction, mask, memory) {
    const [_, memoryId, initialValue] = instruction.match(/mem\[([0-9]+)\] = ([0-9]+)/)
    memory[memoryId] = masks.applyToNumber(+initialValue, mask)
  }
}

const bits = {
  BIT_LENGTH: 36,
  /**
   * Converts 36 bit string to number
   * @param {*} string 
   */
  bitsToNumber (string) {
    return string.split('').reverse().map(itm => +itm).reduce((acc, itm, index) => acc + itm * Math.pow(2, index), 0)
  },

  /**
   * Converts number to 36 bit string
   * @param {*} string 
   */
  numberToString (number) {
    return new Array(this.BIT_LENGTH).fill(1).map((itm, index) => {
      const remainder = number % Math.pow(2, this.BIT_LENGTH - 1 - index)
      if (remainder === number) return 0
      number = number - Math.pow(2, this.BIT_LENGTH - 1 - index)
      return 1
    }).join('')
  },

}

const masks = {
  applyToNumber (number, mask) {
    return bits.bitsToNumber(this.applyToString(bits.numberToString(number), mask))
  },

  applyToString (string, mask) {
    return string.split('').map((itm, index) => ['0','1'].includes(mask[index]) ? mask[index] : itm).join('')
  }
}

module.exports = { bits, masks, initializationProgram }