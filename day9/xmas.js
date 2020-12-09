const xmas = {

  crack ({ input, preambleLength }) {
    const firstInvalidNumber = this.findInvalidNumbers({ input, preambleLength })[0]
    return firstInvalidNumber
  },

  findInvalidNumbers ({ input, preambleLength }) {
    // All numbers to check
    const numbers = input.slice(preambleLength, input.length)

    return numbers.reduce((acc, number, index) => {
      // Check number against last <preambleNumber> numbers
      const array = input.slice(index, preambleLength + index)
      if (!this.isValid(array, number)) acc.push(number)
      return acc
    }, [])
  },

  /**
   * @returns true if the number is the result of the addition of any 2 numbers in the array
   */
  isValid: (array, number) => array.some(a => 
    array.reduce((acc,b) => 
      acc.concat(a+b === number)
    , []).some(itm => !!itm)
  ),

  /**
   * 
   * @param {*} param.input: numbers array
   * @param {*} param.number: the number we are looking for

   */
  findContiguousNumbersBoundaries ({ input, number }) {
    // adds up the numbers in an array
    const addUp = (array) => array.reduce((acc, itm) => acc + itm, 0)

    const [contiguousNumbers] = input.reduce((acc, a, indexA) => {
      input.map((b, indexB) => {
        const range = input.slice(indexA, indexB)
        if (range.length > 1 && addUp(range) === number) acc.push(range)
      })
      return acc
    }, [])
    // Filter out the result for the single number on its own.

    return [
      Math.min(...contiguousNumbers),
      Math.max(...contiguousNumbers)
    ]
  }
}
module.exports = xmas