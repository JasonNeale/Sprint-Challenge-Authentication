const request = require('request')
const router = require('express').Router()
const db = require('../data/dbConfig')
const bcryptjs = require('bcryptjs')
const {add} = require('../users/users-model')


beforeEach(async () => {
  await db('users').truncate()
})

const user = {
  username: 'Test User',
  password: '1234567890'
}

describe('tests auth api functionality', () => {
  it('/api/auth/register endpoint - should return 201 (created)', () => {
    return request(router)
    .post('/api/auth/register')
    .send(user)
    .expect(201)
  })

  it('/api/auth/register endpoint - should return 500 (server error)', () => {
    return request(router)
    .post('/api/auth/register')
    .send(user+user)
    .expect(500)
  })

  it('/api/auth/login endpoint - should return 401 (not found)', () => {
    router.post('/register', async (req, res) => {
    return request(router)
    .post('/api/auth/login')
    .send(user)
    .expect(401)
  })

  it('/api/auth/login endpoint - should return 500 (server error)', () => {
    return request(router)
    .post('/api/auth/login')
    .send(user+user)
    .expect(500)
  })
})