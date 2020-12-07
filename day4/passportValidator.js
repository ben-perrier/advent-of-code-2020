const passport = require('./passport')

const passportFileProcessor = (inputFile) => {
  const passports = getPassportsFromFile(inputFile)
  return passports.filter(passport.validate)
}

const getPassportsFromFile = (inputFile) => {
  const { completePassports } = inputFile.reduce((acc, line) => {
    const { completePassports, partialPassport } = acc
    if (line !== '') return { ...acc, partialPassport: partialPassport.concat(line) }
    if (line === '') return { ...acc, completePassports: completePassports.concat(passport.format(partialPassport)), partialPassport: [] }
  }, { completePassports: [], partialPassport: [] })
  return completePassports
}

module.exports = { passportFileProcessor }