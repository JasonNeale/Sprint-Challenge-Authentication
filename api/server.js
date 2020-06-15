const session = require('express-session')
const knexSessionStore = require('connect-session-knex')(session)
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const authenticate = require('../auth/authenticate-middleware.js')
const authRouter = require('../auth/auth-router.js')
const jokesRouter = require('../jokes/jokes-router.js')
const server = express()


const sessionConfig = {
    name: 'thissess',
    secret: 'bluerazzcandy',
    cookie: {
      maxAge: 1000 * 60 * 60,
      secure: false,
      httpOnly: true
    },
    resave: false,
    saveUninitialized: false,
  
    store: new knexSessionStore(
      {
        knex: require("../data/dbConfig.js"),
        tablename: "sessions",
        sidfieldname: "sid",
        createtable: true,
        clearInterval: 1000 * 60 * 60
      }
    )
  }


server.use(helmet())
server.use(express.json())
server.use(cors())
server.use(session(sessionConfig))
server.use('/api/auth', authRouter)
server.use('/api/jokes', authenticate, jokesRouter)

module.exports = server