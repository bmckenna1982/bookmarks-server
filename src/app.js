require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')
const logger = require('./logger')
const errorHandler = require('./error-handler')
const bookmarksRouter = require('./bookmarks/bookmarksRouter')

const app = express()

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common'

app.use(morgan(morganOption))
app.use(helmet())
app.use(cors())

app.use(function validateBearerToken(req, res, next) {
  const apiToken = process.env.API_TOKEN
  const authToken = req.get('Authorization')

  if (!authToken || authToken.split(' ')[1] !== apiToken) {
    logger.error(`Unauthorized request to path: ${req.path}`)
    return res.status(401).json({ error: 'Unauthorized request' })
  }
  // move to the next middleware
  next()
})

app.use(bookmarksRouter)

app.get('/', (req, res) => {
  res.send('Hello, world!')
})

// app.get('/bookmarks', (req, res) => {
//   res.json(bookmarks)
// })

// app.get('/bookmarks/:id', (req,res) => {
//   const { id } = req.params
//   console.log(id)
//   const bookmark = bookmarks.find(b => b.id == id)

//   if (!bookmark) {
//     logger.error(`Bookmark with id ${id} not found`)
//     return res.status(404).send('Bookmark not found')
//   }

//   res.json(bookmark)
// })

// app.post('/bookmarks', (req,res) => {
//   const { title, url, description, rating=1 } = req.body

//   if(!title) {
//     logger.error(`Title is required`)
//     return res.status(400).send('Invalid data')
//   }
//   if(!url) {
//     logger.error(`URL is required`)
//     return res.status(400).send('Invalid data')
//   }
//   if(!description) {
//     logger.error(`Description is required`)
//     return res.status(400).send('Invalid data')
//   }

//   const id = uuid()

//   const bookmark = {
//     id, 
//     title, 
//     url, 
//     description, 
//     rating
//   }

//   bookmarks.push(bookmark)

//   logger.info(`Bookmark with id ${id} added to list`)

//   res
//     .status(201)
//     .location('http:localhost8000/bookmarks/${id}')
//     .json(bookmark)

// })

// app.delete('/bookmarks/id', (req,res) => {
//   const { id } = req.params

//   const bookmarkIndex = bookmarks.findIndex(b => b.id == id)

//   if (bookmarkIndex === -1) {
//     logger.error(`Bookmark with id ${id} not found`)
//     return res.status(404).send('Not Found')
//   }

//   bookmarks.splice(bookmarkIndex, 1)

//   logger.info(`Bookmark with id ${id} was deleted`)
//   res.status(200).end()
// })

app.use(errorHandler)

module.exports = app