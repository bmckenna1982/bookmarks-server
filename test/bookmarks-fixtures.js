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

function makeMaliciousBookmark() {
  const maliciousBookmark = {
    id: 911,
    title: 'Naughty naughty very naughty <script>alert("xss");</script>',
    url: 'https://www.hackers.com',
    description: `Bad image <img src="https://url.to.file.which/does-not.exist" onerror="alert(document.cookie);">. But not <strong>all</strong> bad.`,
    rating: 1,
  }
  const expectedBookmark = {
    ...maliciousBookmark,
    title: 'Naughty naughty very naughty &lt;script&gt;alert(\"xss\");&lt;/script&gt;',
    description: `Bad image <img src="https://url.to.file.which/does-not.exist">. But not <strong>all</strong> bad.`
  }
  return {
    maliciousBookmark,
    expectedBookmark,
  }
}

module.exports = {
  makeBookmarksArray,
  makeMaliciousBookmark,
}