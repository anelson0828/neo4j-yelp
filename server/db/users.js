/* eslint-disable no-multi-str */
var _ = require('lodash')
const {session} = require('./neo4j')

function createUser(params) {
  return session
    .run(
      `MERGE (u:User {name: "${params.name}"}) \
      RETURN u`
    )
    .then(result => {
      session.close()
      if (_.isEmpty(result.records)) return null
      var record = result.records[0]
      return record.get('u')
    })
    .catch(error => {
      session.close()
      throw error
    })
}

function getUser(name) {
  return session
    .run(
      `MATCH (u:User {name:${name}}) \
      RETURN u
      LIMIT 1`
    )
    .then(result => {
      session.close()

      if (_.isEmpty(result.records)) return null

      var record = result.records[0]
      return record.get('u')
    })
    .catch(error => {
      session.close()
      throw error
    })
}

function getUsers() {
  return session
    .run(
      `MATCH (u:User)
      RETURN u.name`
    )
    .then(result => {
      session.close()
      return result.records.map(record => {
        return record.get('u.name')
      })
    })
    .catch(error => {
      session.close()
      throw error
    })
}

function favoriteDate(date, username) {
  return session
    .run(
      `MATCH (u:User {name: "${username}"}), (d: Date {name: "${
        date.date.properties.name
      }"})\
      MERGE (u)-[:FAVORITE]->(d) \
      RETURN d`
    )
    .then(result => {
      session.close()
      if (_.isEmpty(result.records)) return null
      var record = result.records[0]
      return record.get('d')
    })
    .catch(error => {
      session.close()
      throw error
    })
}

function getFavoriteDates(username) {
  return session
    .run(
      `MATCH (u:User {name: "${username}"})-[:FAVORITE]->(d:Date) \
      RETURN d`
    )
    .then(result => {
      session.close()
      if (_.isEmpty(result.records)) return []
      return result.records.map(record => {
        return record.get('d')
      })
    })
    .catch(error => {
      session.close()
      throw error
    })
}

function getRecommendedDates(username) {
  return session
    .run(
      `MATCH (u:User {name: "${username}"})-[:FAVORITE]->(d:Date)<-[:FAVORITE]-(f:User)-[:FAVORITE]->(rec:Date) \
      WHERE NOT EXISTS( (u)-[:FAVORITE]->(rec) ) \
      RETURN rec`
    )
    .then(result => {
      session.close()
      if (_.isEmpty(result.records)) return []
      return result.records.map(record => {
        return record.get('rec')
      })
    })
    .catch(error => {
      session.close()
      throw error
    })
}

module.exports = {
  createUser,
  getUser,
  getUsers,
  favoriteDate,
  getFavoriteDates,
  getRecommendedDates
}
