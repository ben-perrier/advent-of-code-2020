const { isNumber } = require("lodash")

module.exports = {
  PASSPORT_FIELD_SEPARATOR: ' ',
  /**
   * @param {*} passportLines 
   * @returns: passport object with properties
   */
  format (passportLines) {
    return passportLines
    .join(this.PASSPORT_FIELD_SEPARATOR)
    .split(this.PASSPORT_FIELD_SEPARATOR)
    .map((itm) => itm.split(':'))
    .map(([key, value]) => {
      // format numbers
      if (['byr', 'iyr', 'eyr'].includes(key)) return [key, +value]
      return [key, value]
    })
    .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {})
  },

  /**
   * Passport fields validation
      byr (Birth Year) - four digits; at least 1920 and at most 2002.
      iyr (Issue Year) - four digits; at least 2010 and at most 2020.
      eyr (Expiration Year) - four digits; at least 2020 and at most 2030.
      hgt (Height) - a number followed by either cm or in:
          If cm, the number must be at least 150 and at most 193.
          If in, the number must be at least 59 and at most 76.
      hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
      ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
      pid (Passport ID) - a nine-digit number, including leading zeroes.
      cid (Country ID) - ignored, missing or not.
   */
  validate (passport) {
    const allPropsAvailable = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'].every((itm) => passport[itm])
    if (!allPropsAvailable) return false
  
    // Validate number values
    if (!['byr', 'iyr', 'eyr'].every(itm => isNumber(passport[itm]))) return false
    
    const { byr, iyr, eyr, hgt, hcl, ecl, pid } = passport
  
    const isHGLValid = (hgt) => {
      const match = String(hgt).match(/^([0-9]+)(cm|in)$/)
      if (!match) return false
      const [full, quantity, unit] = match
      if (!['cm', 'in'].includes(unit)) return false
      if (unit === 'cm') return +quantity >= 150 && +quantity <= 193
      return +quantity >= 59 && +quantity <= 76
    }
    const allValid = [
      // Field specific rules
      byr >= 1920 && byr <= 2002,
      iyr >= 2010 && iyr <= 2020,
      eyr >= 2020 && eyr <= 2030,
      hgt && isHGLValid(hgt),
      hcl && /^#[0-9a-fA-F]{6}$/.test(hcl),
      ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(ecl),
      pid && /^[0-9]{9}$/.test(String(pid))
    ]
    return allValid.every(itm => !!itm)
  }
}