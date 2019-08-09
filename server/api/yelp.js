const router = require('express').Router()
module.exports = router

const yelp = require('yelp-fusion')
const apiKey = process.env.YELP_APIKEY
const client = yelp.client(apiKey)
const clientId = process.env.YELP_CLIENT_ID

router.get(`/search`, async (req, res, next) => {
  try {
    const searchParams = {
      term: req.query.term,
      location: req.query.location
    }
    const response = await client.search(searchParams)
    const json = response.jsonBody.businesses
    const formattedJson = JSON.stringify(json, null, 4)
    res.send(formattedJson)
  } catch (err) {
    next(err)
  }
})
