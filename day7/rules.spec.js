const rules = require('./rules')

describe('rules', () => {
  describe('getRestriction', () => {
    it('should return a restriction object', () => {
      const input = '1 plaid salmon bag, 2 plaid beige bags.'
      expect(rules.getRestrictions(input)).toEqual([{
        qty: 1,
        id: 'plaid salmon bag'
      }, {
        qty: 2,
        id: 'plaid beige bag'
      }])
    })
  })

  describe('getRules', () => {
    it('should return a restriction object', () => {
      const input = 'wavy green bags contain 5 pale coral bags, 1 dull blue bag, 4 drab blue bags, 1 striped tan bag.'
      expect(rules.getRule(input)).toEqual({
        id: 'wavy green bag',
        adjective: 'wavy',
        color: 'green',
        mayContain: [{
          qty: 5,
          id: 'pale coral bag'
        }, {
          qty: 1,
          id: 'dull blue bag'
        }, {
          qty: 4,
          id: 'drab blue bag'
        }, {
          qty: 1,
          id: 'striped tan bag'
        }]
      })
    })
  })

  describe('getSuitableBags', () => {
    it('should return all bags allowing for item', () => {
      const input = `light red bags contain 1 bright white bag, 2 muted yellow bags.
dark orange bags contain 3 bright white bags, 4 muted yellow bags.
bright white bags contain 1 shiny gold bag.
muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.
shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.
dark olive bags contain 3 faded blue bags, 4 dotted black bags.
vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.
faded blue bags contain no other bags.
dotted black bags contain no other bags.`

      const suitableBags = rules.getSuitableBags({ item: 'shiny gold bag', rulesInput: input.split('\n') })
      expect(suitableBags).toEqual(['bright white bag', 'muted yellow bag', 'light red bag', 'dark orange bag'])
      const colorCount = new Set(suitableBags.map((itm) => itm.split(' ')[1]))
      expect(colorCount.size).toEqual(4)
    })
  })

})