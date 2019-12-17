const { expect } = require('chai')
const supertest = require('supertest')

global.expect = expect
global.supertest = supertest

process.env.API_TOKEN = 'testAPI_token'
process.env.TEST_DB_URL = "postgresql://dunder_mifflin:office@localhost/bookmarks_test"