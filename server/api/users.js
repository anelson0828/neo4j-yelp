const router = require('express').Router()
const {
  createUser,
  getUsers,
  favoriteDate,
  getFavoriteDates,
  getRecommendedDates
} = require('../db/users')
module.exports = router

router.post('/', async (req, res, next) => {
  try {
    const user = await createUser(req.body)
    res.json(user)
  } catch (err) {
    next(err)
  }
})

router.put('/:username/favorite', async (req, res, next) => {
  try {
    const date = await favoriteDate(req.body, req.params.username)
    console.log('favorite', date)
    res.json(date)
  } catch (err) {
    next(err)
  }
})

router.get('/:username/favorite', async (req, res, next) => {
  try {
    const dates = await getFavoriteDates(req.params.username)
    res.json(dates)
  } catch (err) {
    next(err)
  }
})

router.get('/:username/recommended', async (req, res, next) => {
  try {
    const dates = await getRecommendedDates(req.params.username)
    res.json(dates)
  } catch (err) {
    next(err)
  }
})

router.get('/', async (req, res, next) => {
  try {
    const users = await getUsers()
    res.json(users)
  } catch (err) {
    next(err)
  }
})
