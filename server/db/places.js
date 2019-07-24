var _ = require('lodash')
var dbUtils = require('../neo4j/dbUtils')
var Place = require('../models/neo4j/place')
var User = require('../models/neo4j/user')

function searchPlaces(session, queryString) {
  return session
    .run(
      'MATCH (place:Place) \
      WHERE place.title =~ {title} \
      RETURN place',
      {title: '(?i).*' + queryString + '.*'}
    )
    .then(result => {
      session.close()
      return result.records.map(record => {
        return new Place(record.get('place'))
      })
    })
    .catch(error => {
      session.close()
      throw error
    })
}

function createPlace(session, name) {
  return session
    .run(
      'MATCH (place:Place {name:{name}}) \
      OPTIONAL MATCH (place)<-[r]-(person:Person) \
      RETURN place.name AS name, \
      LIMIT 1',
      {name}
    )
    .then(result => {
      session.close()

      if (_.isEmpty(result.records)) return null

      var record = result.records[0]
      return new Place(record.get('name'))
    })
    .catch(error => {
      session.close()
      throw error
    })
}

function getPlace(session, title) {
  return session
    .run(
      "MATCH (place:Place {title:{title}}) \
      OPTIONAL MATCH (place)<-[r]-(person:Person) \
      RETURN place.title AS title, \
      collect([person.name, \
           head(split(lower(type(r)), '_')), r.roles]) AS cast \
      LIMIT 1",
      {title}
    )
    .then(result => {
      session.close()

      if (_.isEmpty(result.records)) return null

      var record = result.records[0]
      return new MovieCast(record.get('title'), record.get('cast'))
    })
    .catch(error => {
      session.close()
      throw error
    })
}

module.exports = {
  searchPlaces,
  createPlace,
  getPlace
}
