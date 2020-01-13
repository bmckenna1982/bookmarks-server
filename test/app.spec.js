const app = require('../src/app')

describe('App', () => {
  it.skip('GET / responds with 200 containing "Hello, world!"', () => {
  return supertest(app)
    .get('/')
    .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
    .expect(200, 'Hello, world!')
  })
})