const passport = require('../passport')

describe('passport', () => {

  describe('format', () => {
    it('should format passport info', () => {
      const validPassportInput  = ['ecl:gry pid:860033327 eyr:2020', 'hcl:#fffffd byr:1937 iyr:2017 cid:147 hgt:183cm']
      const passportObj = passport.format(validPassportInput)
      expect(passportObj).toMatchObject({
        ecl:'gry', pid: 860033327, eyr:2020, hcl:'#fffffd', byr:1937, iyr:2017, cid:'147', hgt:'183cm'
      })
    })
  })

})

describe('validate', () => {
  const validPassport = { ecl:'gry', pid:860033327, eyr:2020, hcl:'#fffffd', byr:1937, iyr:2017, cid:'147', hgt:'183cm' }

  it('should validate a complete passport', () => {
    expect(passport.validate(validPassport)).toBe(true)
  })

  it('should treat cid as optional', () => {
    const missingCIDPassport = { ecl:'gry', pid:860033327, eyr:2020, hcl:'#fffffd', byr:1937, iyr:2017, hgt:'183cm' }
    expect(passport.validate(missingCIDPassport)).toBe(true)
  })

  it('should reject an incomplete passport', () => {
    const invalidPassport = { ecl:'gry', pid:860033327, eyr:2020, hcl:'#fffffd', byr:1937, iyr:2017 }
    expect(passport.validate(invalidPassport)).toBe(false)
  })

  it('should reject an invalid byr', () => {
    // low
    expect(passport.validate({ ...validPassport, byr: 1920 })).toBe(true)
    expect(passport.validate({ ...validPassport, byr: 1919 })).toBe(false)
    // high
    expect(passport.validate({ ...validPassport, byr: 2002 })).toBe(true)
    expect(passport.validate({ ...validPassport, byr: 2003 })).toBe(false)
  })

  it('should reject an invalid iyr', () => {
    // low
    expect(passport.validate({ ...validPassport, iyr: 2010 })).toBe(true)
    expect(passport.validate({ ...validPassport, iyr: 2009 })).toBe(false)
    // high
    expect(passport.validate({ ...validPassport, iyr: 2020 })).toBe(true)
    expect(passport.validate({ ...validPassport, iyr: 2021 })).toBe(false)
  })

  it('should reject an invalid eyr', () => {
    // low
    expect(passport.validate({ ...validPassport, eyr: 2020 })).toBe(true)
    expect(passport.validate({ ...validPassport, eyr: 2019 })).toBe(false)
    //high
    expect(passport.validate({ ...validPassport, eyr: 2030 })).toBe(true)
    expect(passport.validate({ ...validPassport, eyr: 2031 })).toBe(false)
  })

  it('should handle hgt ', () => {
    expect(passport.validate({ ...validPassport, hgt: 'inin' })).toBe(false)
    expect(passport.validate({ ...validPassport, hgt: 'cmcm' })).toBe(false)
    expect(passport.validate({ ...validPassport, hgt: 190 })).toBe(false)
    // in
    expect(passport.validate({ ...validPassport, hgt: '59in' })).toBe(true)
    expect(passport.validate({ ...validPassport, hgt: '76in' })).toBe(true)
    expect(passport.validate({ ...validPassport, hgt: '77in' })).toBe(false)
    expect(passport.validate({ ...validPassport, hgt: '58in' })).toBe(false)
    // cm
    expect(passport.validate({ ...validPassport, hgt: '150cm' })).toBe(true)
    expect(passport.validate({ ...validPassport, hgt: '193cm' })).toBe(true)
    expect(passport.validate({ ...validPassport, hgt: '149cm' })).toBe(false)
    expect(passport.validate({ ...validPassport, hgt: '194cm' })).toBe(false)
  })

  it('should handle hcl', () => {
    // same reuslt with caps
    expect(passport.validate({ ...validPassport, hcl: '#123abf' })).toBe(true)
    expect(passport.validate({ ...validPassport, hcl: '#123ABF' })).toBe(true)
    expect(passport.validate({ ...validPassport, hcl: '123ABF' })).toBe(false)
    expect(passport.validate({ ...validPassport, hcl: '111111' })).toBe(false)
    expect(passport.validate({ ...validPassport, hcl: '#hhhhhh' })).toBe(false)
  })

  it('should handle ecl', () => {
    expect(passport.validate({ ...validPassport, ecl: 'amb' })).toBe(true)
    expect(passport.validate({ ...validPassport, ecl: 'blu' })).toBe(true)
    expect(passport.validate({ ...validPassport, ecl: 'brn' })).toBe(true)
    expect(passport.validate({ ...validPassport, ecl: 'gry' })).toBe(true)
    expect(passport.validate({ ...validPassport, ecl: 'grn' })).toBe(true)
    expect(passport.validate({ ...validPassport, ecl: 'hzl' })).toBe(true)
    expect(passport.validate({ ...validPassport, ecl: 'oth' })).toBe(true)

    expect(passport.validate({ ...validPassport, ecl: 'lal' })).toBe(false)
    expect(passport.validate({ ...validPassport, ecl: '' })).toBe(false)
  })

  it('should handle ecl', () => {
    expect(passport.validate({ ...validPassport, pid: '000000001' })).toBe(true)
    expect(passport.validate({ ...validPassport, pid: '912334443' })).toBe(true)
    expect(passport.validate({ ...validPassport, pid: '0123456789' })).toBe(false)
  })

  it('should handle cid', () => {
    expect(passport.validate({ ...validPassport, cid: '000000001' })).toBe(true)
    expect(passport.validate({ ...validPassport, cid: '912334443' })).toBe(true)
    expect(passport.validate({ ...validPassport, cid: '0123456789' })).toBe(true)
  })

  it.only('should validate passport info', () => {
    const set = [
      ['pid:087499704 hgt:74in ecl:grn iyr:2012 eyr:2030 byr:1980','hcl:#623a2f'],
      ['eyr:2029 ecl:blu cid:129 byr:1989','iyr:2014 pid:896056539 hcl:#a97842 hgt:165cm'],
      ['hcl:#888785', 'hgt:164cm byr:2001 iyr:2015 cid:88', 'pid:545766238 ecl:hzl', 'eyr:2022']
    ]
    const fmt = set.map(itm => passport.format(itm))
    const val = fmt.map(itm => passport.validate(itm))
    console.log(fmt)
    expect(val[0]).toBe(true)
    console.log('afta')

    expect(val[1]).toBe(true)
    expect(val[2]).toBe(true)
  })

})


