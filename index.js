const restana = require('restana')
const morgan = require('morgan')

const service = restana()
service.use(morgan('tiny'))

service.get('/echo/:latency/ms', (req, res) => {
  const { latency } = req.params

  res.setHeader('x-added-latency-ms', latency)
  setTimeout(() => res.send(req.headers), latency)
})

service.start(3000)
