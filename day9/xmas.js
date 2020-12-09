const xmas = {
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
  )

}
module.exports = xmas