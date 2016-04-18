/**
 * Module dependencies
 */
import express from 'express'

const port = process.env.PORT || 3000
const app = express()

/**
 * Expose
 */

export default app

// Bootstrap routes
require('./config/express')(app)
require('./config/routes')(app)

listen()
function listen () {
  if (app.get('env') === 'test') return
  app.listen(port)
  const startMsg = `Server started\nport: ${port}\n`
  console.log(startMsg)
}
