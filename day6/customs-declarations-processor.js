const declarations = {
  splitByGroups (input) {
    return input.split('\n\n')
  },

  /**
   * Counts the number of questions answered with a yes by any person per group
   * @param {Array} input: Text file input
   * @return {Array}: count of questions answered yes by at least one person per group
   */
  countPositivelyAnsweredByGroup (input) {
    return this.splitByGroups(input).map(itm => itm.split('\n').join(''))
    .map(itm => new Set(itm.split('')).size)
  },

  /**
   * Counts the number of questions answered with a yes by any person per group
   * @param {Array} input: Text file input
   * @return {Array}: count of questions answered yes by at least one person per group
   */
  countPositivelyAnsweredByEveryoneByGroups (input) {
    return this.splitByGroups(input).map(itm => itm.split('\n'))
    .map(group => group.reduce((acc, passengerAnswer) => {
      // If passengerAnswer does not contain the positive answer, remove it
      [...acc].map(positive => passengerAnswer.indexOf(positive) === -1 && acc.delete(positive))
      return acc
    // Default acc with 1st passenger's positive answers
    }, new Set(group[0].split(''))).size)
  }

}

module.exports = declarations