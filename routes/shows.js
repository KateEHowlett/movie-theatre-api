const express = require('express')
const router = express.Router()
const { Show } = require('../models/index')
const { db } = require('../db/connection')

const checker = function (request, response, next) {
  const { status } = request.params

  // make sure status exists and fail fast
  if (!status) {
    response.status(400).send({ error: 'No status found' })
    return
  }

  // valid statuses
  const statuses = ['running', 'cancelled']

  // if status not a valid choice, yell at the dev!
  if (!statuses.includes(status)) {
    response.status(400).send({ error: 'Must be a valid status', statuses })
    return
  }

  next()
}

router.get('/', async (request, response) => {
  let shows = await Show.findAll({})
  response.json(shows)
})

router.get('/:showid', async (request, response) => {
  const showid = request.params.showid
  const show = await Show.findByPk(showid)
  response.json(show)
})

router.get('/genres/:genre', async (request, response) => {
  const genre = request.params.genre
  const show = await Show.findAll({ where: { genre: genre } })
  response.json(show)
})

router.put('/:showid/rating/:rating', async (request, response) => {
  await Show.update(
    { rating: request.params.rating },
    {
      where: {
        id: request.params.showid
      }
    }
  )
  const show = await Show.findByPk(request.params.showid)
  response.json(show)
})

// Trying out custom middleware (at top of file) to validate the parameters
router.put('/:showid/status/:status', checker, async (request, response) => {
  await Show.update(
    { status: request.params.status },
    {
      where: {
        id: request.params.showid
      }
    }
  )
  const show = await Show.findByPk(request.params.showid)
  console.log(show)
  response.json(show)
})

router.delete('/:showid', async (request, response) => {
  const deleted = await Show.findByPk(request.params.showid)
  await Show.destroy({
    where: {
      id: request.params.showid
    }
  })
  response.json(deleted)
})

module.exports = router
