const router = require('express').Router()
const {Place} = require('../db/models')
const {searchPlaces, createPlace, getPlace} = require('../db/places')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    console.log('api places', req.body)
    const place = await createPlace(req.body)
    res.json(place)
  } catch (err) {
    next(err)
  }
})
