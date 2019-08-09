const router = require('express').Router()
module.exports = router

const apiKey = process.env.TMDB_APIKEY

router.get(`/search`, async (req, res, next) => {
  try {
    const response = await router.get(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=1`
    )
    res.send(response)
  } catch (err) {
    next(err)
  }
})
