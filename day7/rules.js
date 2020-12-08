const rules = {

  /**
   * @param {*} string: rule line from file, e.g. `striped black bags contain 1 plaid salmon bag, 2 plaid beige bags, 4 dotted teal bags, 2 posh chartreuse bags.`
   * @returns Rule
   * 
   * @typedef {object} Rule
   * @property {string} id: bag id the rule applies to e.g. `shiny gold bag`
   * @property {string} color: bag color, e.g. `shiny gold`
   * @property {array} contain: list of restrictions of type contain
   */
  getRule (string) {
    const [id, rest] = string.split(' contain ')
    const [adjective, color] = id.match(/([a-z]+)+/g)
    const contain = this.getRestrictions(rest)
    return { 
      id: id.match(/(.+ bag)/)[0],
      color: `${adjective} ${color}`,
      contain
    }
  },

  getRules (rulesInput) {
    return rulesInput.map(itm => this.getRule(itm))
  },

  /**
   * @param {*} string: restriction string for restrictions of type contain
   * 
   * @typedef {object} ContainRestricction
   * @property {number} qty: quantity of bags
   * @property {string} id: the bag id which is the object of the restriction, e.g. 'shiny gold bag'
   */
  getRestrictions (string) {
    return string.split(', ').map(itm => {
      const [m, qty, id] = itm.match(/([0-9]?) (.+ bag)/)
      return { qty: +qty, id }
    })
  },

  /**
   * @param {string} params.item: The item we are trying to fit in a bag, e.g. `shiny gold bag`
   * @param {array} params.rulesInput: The restriction rules
   * 
   * @returns the list of unique bag ids which may contain the requested item, e.g. a shiny gold bag
   */
  getSuitableBags ({ item, qty = 1, rulesInput }) {
    const rules = this.getRules(rulesInput)

    // Finds bags with mayContain rule for the item
    const findBagWhich_mayContain = (item) => 
      rules.filter(({ contain }) => contain.some((itm) => itm.id === item)
    )
    // Recursively finds bags with mayContain rule and bags which may contain them
    const findAllSuitableBags = (items, suitableBags = []) => {
      const newBags = items.map(findBagWhich_mayContain).flat().map(({ id }) => id)
      if (newBags.length) return findAllSuitableBags(newBags, suitableBags.concat(newBags))
      return [...(new Set(suitableBags))]
    }
    return findAllSuitableBags([item])
  },

}

module.exports = rules