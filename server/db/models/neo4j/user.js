// extracts just the data from the query results

var _ = require('lodash')

var User = (module.exports = function(_node) {
  var username = _node.properties.username

  _.extend(this, {
    id: _node.properties.id,
    username: username
  })
})

module.exports = User
