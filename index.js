require('dotenv').config()

const server = require('./api/server.js')

const PORT = process.env.PORT || 5001
server.listen(PORT, () => {
  console.log(`\nServer listening on port ${PORT}\n`)
})