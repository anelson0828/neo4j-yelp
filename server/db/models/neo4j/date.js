const _ = require('lodash')

function Date(_node) {
  _.extend(this, _node.properties)

  if (this.id) {
    this.id = this.id.toNumber()
  }
}

module.exports = Date
