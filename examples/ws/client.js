require('bare-node-runtime/global')

const WebSocket = require('ws', {
  with: { imports: 'bare-node-runtime/imports' }
})

const ws = new WebSocket('ws://localhost:8080')

ws.on('error', console.error)

ws.on('open', () => {
  ws.send('something')
})

ws.on('message', (data) => {
  console.log('received: %s', data)
})
