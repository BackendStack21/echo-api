const restana = require('restana')
const morgan = require('morgan')
const http = require('http')
const WebSocket = require('faye-websocket')

const server = http.createServer()
const service = restana({
  server
})
service.use(morgan('tiny'))

service.get('/echo/:latency/ms', (req, res) => {
  const { latency } = req.params

  res.setHeader('x-added-latency-ms', latency)
  setTimeout(() => res.send(req.headers), latency)
})

server.on('upgrade', function (request, socket, body) {
  if (WebSocket.isWebSocket(request)) {
    let ws = new WebSocket(request, socket, body)
    console.log(`${new Date().toISOString()} - WebSocket connection started`)

    ws.on('message', function (event) {
      console.log(`${new Date().toISOString()} - Echoing WebSocket message...`)
      ws.send(event.data)
    })

    ws.on('close', function (event) {
      console.log(`${new Date().toISOString()} - WebSocket connection closed {code: "${event.code}", reason: "${event.reason}"}`)
      ws = null
    })
  }
})

service.start(3000)
