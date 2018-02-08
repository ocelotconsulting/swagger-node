const fs = require('fs')
const path = require('path')
const bodyParser = require('body-parser')
const express = require('express')
const opn = require('opn')
const warningMessage = 'Keep this process running until you are done editing.'

module.exports = (project, options) => {
  const {swaggerFile} = project.api
  const app = express()

  app.get('/swagger.yaml', (req, res, next) => {
    console.info('swaggerFile', swaggerFile)
    fs.createReadStream(swaggerFile).pipe(res)
  })
  app.put('/swagger.yaml', bodyParser.json({limit: '5mb'}), (req, res, next) => {
    if (req.body.hasOwnProperty('yaml')) {
      const ws = fs.createWriteStream(swaggerFile)
      ws.on('error', (e) => {
        console.error(e)
        res.status(500).send(e)
      })
      ws.write(req.body.yaml)
      ws.end(() => {
        res.send()
      })
    } else {
      res.send()
    }
  })
  app.use(express.static(path.resolve(__dirname, '../../public')))

  const {host: hostname = '127.0.0.1'} = options
  const server = app.listen(options.port || 0, hostname, function () {
    const {port} = server.address()
    console.log(`Starting Swagger Editor at http://${hostname}:${port}/#/edit`)
    console.log(warningMessage)
    opn(`http://${hostname}:${port}/#/edit`)
  })
}
