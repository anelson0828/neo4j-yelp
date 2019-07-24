const router = require('express').Router()
const {Place} = require('../db/models')
const {searchPlaces, createPlace, getPlace} = require('../db/places')
module.exports = router

router.post('/', async (req, res, next) => {
  try {
    const place = await createPlace(req.body)
    res.json(place)
  } catch (err) {
    next(err)
  }
})
