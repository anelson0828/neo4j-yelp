const router = require('express').Router()
const {createDate} = require('../db/dates')
module.exports = router

router.post('/', async (req, res, next) => {
  try {
    const date = await createDate(req.body)
    res.json(date)
  } catch (err) {
    next(err)
  }
})
