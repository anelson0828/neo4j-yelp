/* eslint-disable no-multi-str */
var _ = require('lodash')
var Date = require('./models/neo4j/date')
const {session} = require('./neo4j')

function createDate(params) {
  return session
    .run(
      `MERGE (p:Date {name: "${params.name}"}) \
RETURN p.name`
    )
    .then(result => {
      session.close()
      if (_.isEmpty(result.records)) return null
      var record = result.records[0]
      return new Date(record.get('p.name'))
    })
    .catch(error => {
      session.close()
      throw error
    })
}

module.exports = {
  createDate
}
