# Introduction
Basic *echo* API to help debugging API gateway or proxy solutions.

# Usage
The service exposes the following endpoints:
- `GET /echo/:latency/ms`: The endpoints respond with the HTTP request headers using the `:latency` parameter value to introduce artificial latency.

## Example: 
```bash
docker run --rm -p 3000:3000 kyberneees/echo-api:latest
```
```bash
curl -v http://localhost:3000/echo/10/ms

*   Trying 127.0.0.1:3000...
* Connected to localhost (127.0.0.1) port 3000 (#0)
> GET /echo/10/ms HTTP/1.1
> Host: localhost:3000
> User-Agent: curl/7.79.1
> Accept: */*
> 
* Mark bundle as not supporting multiuse
< HTTP/1.1 200 OK
< x-added-latency-ms: 10
< content-type: application/json; charset=utf-8
< Date: Wed, 25 May 2022 12:50:24 GMT
< Connection: keep-alive
< Keep-Alive: timeout=5
< Content-Length: 67
< 
* Connection #0 to host localhost left intact
{"host":"localhost:3000","user-agent":"curl/7.79.1","accept":"*/*"}
```

Container logs:
```bash
GET /echo/10/ms 200 - - 10.244 ms
...
```

# Implementation
```js
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
```