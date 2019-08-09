/* eslint-disable no-multi-str */
var _ = require('lodash')
var Date = require('./models/neo4j/date')
const {session} = require('./neo4j')

function createDate(params) {
  return session
    .run(
      `MERGE (d:Date {name: "${params.name}"})
      WITH d
      OPTIONAL MATCH (d)-->(p)
      RETURN d, collect(p)`
    )
    .then(result => {
      session.close()
      if (_.isEmpty(result.records)) return null
      var record = result.records[0]
      return record.get('d, p')
      // return new Date(record.get('d.name'))
    })
    .catch(error => {
      session.close()
      throw error
    })
}

function getDates() {
  return session
    .run(
      `MATCH (d:Date)
      OPTIONAL MATCH (d)-->(p)
      RETURN d, collect(p)`
    )
    .then(result => {
      session.close()
      return result.records.map(record => {
        let date = record.get('d')
        let items = record.get('collect(p)')
        return {date, items}
      })
    })
    .catch(error => {
      session.close()
      throw error
    })
}

module.exports = {
  createDate,
  getDates
}
