/* eslint-disable no-multi-str */
var _ = require('lodash')
var Place = require('./models/neo4j/place')
const {session} = require('./neo4j')

function searchPlaces(queryString) {
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

function createPlace(params) {
  return session
    .run(
      `MERGE (p:Place {name: "${params.name}"}) \
      ON MATCH SET p.address= ${params.address}, p.image= ${
        params.image
      }, p.rating= ${params.rating}, p.price= ${params.price})
      MERGE (d: Date {name: "${params.dateName}"}) \
      MERGE (d)-[:INCLUDES]->(p) \
      RETURN p.name`
    )
    .then(result => {
      session.close()
      if (_.isEmpty(result.records)) return null
      var record = result.records[0]
      return record.get('p.name')
      // return new Place(record.get('p.name'))
    })
    .catch(error => {
      session.close()
      throw error
    })
}

function getPlace(title) {
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
