require('bare-node-runtime/global')

const { WebSocketServer } = require('ws', {
  with: { imports: 'bare-node-runtime/imports' }
})

const wss = new WebSocketServer({ port: 8080 })

wss.on('connection', (ws) => {
  ws.on('error', console.error)

  ws.on('message', function message(data) {
    console.log('received: %s', data)
  })

  ws.send('something')
})
