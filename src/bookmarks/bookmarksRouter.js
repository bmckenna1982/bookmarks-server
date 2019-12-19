const express = require('express')

const logger = require('../logger')
const BookmarksService = require('../bookmarks-service')
const { isWebUri } = require('valid-url')


const bookmarksRouter = express.Router()
const bodyParser = express.json()

const serializeBookmark = bookmark => ({
  id: bookmark.id,
  title: bookmark.title,
  url: bookmark.url,
  description: bookmark.description,
  rating: Number(bookmark.rating),
})

bookmarksRouter
  .route('/bookmarks')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db')
    BookmarksService.getAllBookmarks(knexInstance)
      .then(bookmarks => {
        res.json(bookmarks)
      })
      .catch(next)
  })

  .post(bodyParser, (req, res, next) => {
    for (const field of ['title', 'url', 'rating']) {
      if (!req.body[field]) {
        logger.error(`${field} is required`)
        return res.status(400).send(`'${field}' is required`)
      }
    }

    const { title, page_url, page_description, rating } = req.body
    // const page_url = req.body.page_url
    // console.log(page_url)

    if (!Number.isInteger(rating) || rating < 0 || rating > 5) {
      logger.error(`Invalid rating '${rating}' supplied`)
      return res.status(400).send(`'rating' must be a number between 0 and 5`)
    }

    if (!isWebUri(page_url)) {
      logger.error(`Invalid url '${page_url}' supplied`)
      return res.status(400).send(`'page_url' must be a valid URL`)
    }

    const newBookmark = { title, page_url, page_description, rating }

    console.log(newBookmark)
    BookmarksService.insertBookmark(
      req.app.get('db'),
      newBookmark
    )
      .then(bookmark => {
        logger.info(`Card with id ${bookmark.id} created.`)
        res
          .status(201)
          .location(`/bookmarks/${bookmark.id}`)
          .json(serializeBookmark(bookmark))
      })
      .catch(next)
  })



bookmarksRouter
  .route('/bookmarks/:id')
  .all((req, res, next) => {
    const { id } = req.params
    console.log(req.params)
    console.log(id)
    BookmarksService.getById(req.app.get('db'), id)
      .then(bookmark => {
        if (!bookmark) {
          logger.error(`Bookmark with id ${id} not found.`)
          return res.status(404).json({
            error: { message: `Bookmark Not Found` }
          })
        }
        res.bookmark = bookmark
        next()
      })
      .catch(next)

  })
  .get((req, res) => {
    res.json(res.bookmark)
  })
  .delete((req, res, next) => {
    // TODO: update to use db
    const { id } = req.params
    BookmarksService.deleteBookmark(
      req.app.get('db'),
      id
    )
      .then(numRowsAffected => {
        logger.info(`Card with id ${id} deleted.`)
        res.status(204).end()
      })
      .catch(next)
  })

  module.exports = bookmarksRouter