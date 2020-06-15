const server = require('../api/server')
const db = require('../data/dbConfig')
const request = require('supertest')


const user = {
  username: 'Test User',
  password: '1234567890'
}

describe('tests auth api functionality', () => {
  it('/api/auth/register endpoint - should return 201 (created)', () => {
    const runTest = request(server)
    .post('/api/auth/register')
    .send(user)
    .expect(201)
  })

  it('/api/auth/register endpoint - should return 500 (server error)', () => {
    const runTest = request(server)
    .post('/api/auth/register')
    .send({
      username: user.username,
      username: user.username,
      password: user.password
    })
    .expect(500)
  })

  it('/api/auth/login endpoint - should return 401 (not found)', () => {
    const runTest = request(server)
    .post('/api/auth/login')
    .send(user)
    .expect(401)
  })

  it('/api/auth/login endpoint - should return 500 (server error)', () => {
    const runTest = request(server)
    .post('/api/auth/login')
    .send(user+user)
    .expect(500)
  })
})