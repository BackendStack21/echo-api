# Introduction
*Echo API*, is a Docker-based solution to help debugging client services and API gateway solutions. 

# Usage
The service exposes the following endpoints:
- `GET /echo/:latency/ms`: The endpoints respond with the HTTP request headers using the `:latency` parameter value to introduce simulated latency.

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

# WebSocket support
The service will accept WebSocket connections on port 3000, incoming messages will be echoed back to client. 

## Example:
(Chrome browser example)
```js
ws = new WebSocket('ws://localhost:3000/echo')
ws.onmessage = (msg) => console.log(msg)

ws.send("Hello World")

// Incoming message printed in console:
// MessageEvent {isTrusted: true, data: 'Hello World', origin: 'ws://localhost:3000', lastEventId: '', source: null, …}
```