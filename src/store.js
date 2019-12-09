const uuid = require('uuid/v4')

const bookmarks = [
  {
    id: uuid(),
    title: 'NHL',
    url: 'http://www.nhl.com',
    description: 'Official site of the NHL',
    rating: 5
  },
  {
    id: uuid(),
    title: 'Google',
    url: 'https://www.google.com',
    description: 'Where we find everything else',
    rating: 4 
  }
]

module.exports = { bookmarks }