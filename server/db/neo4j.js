require('../../node_modules/neo4j-driver/lib/browser/neo4j-web.min.js')

var neo4j = require('neo4j-driver').v1
var driver = neo4j.driver(
  'bolt://localhost',
  neo4j.auth.basic('neo4j', process.env.NEO4J_SECRET)
)

module.exports = {
  db: driver
}
