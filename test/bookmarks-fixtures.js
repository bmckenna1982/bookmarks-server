function makeBookmarksArray() {
  return [
    {
      id: 1,
      title: 'Test Title 1',
      url: 'http://test1.com',
      description: 'Test 1 description',
      rating: 2
    },
    {
      id: 2,
      title: 'Test Title 2',
      url: 'http://test2.com',
      description: 'Test 2 description',
      rating: 1      
    },
    {
      id: 3,
      title: 'Test Title 3',
      url: 'http://test3.com',
      description: 'Test 3 description', 
      rating: 3 
    }
  ]
}

module.exports = { makeBookmarksArray }