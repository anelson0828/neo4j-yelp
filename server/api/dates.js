const router = require('express').Router()
const {createDate, getDates} = require('../db/dates')
module.exports = router

router.post('/', async (req, res, next) => {
  try {
    const date = await createDate(req.body)
    res.json(date)
  } catch (err) {
    next(err)
  }
})

router.get('/', async (req, res, next) => {
  try {
    const dates = await getDates(req.body)
    res.json(dates)
  } catch (err) {
    next(err)
  }
})
