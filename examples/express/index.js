require('bare-node-runtime/global')

const express = require('express', {
  with: { imports: 'bare-node-runtime/imports' }
})

const app = express()

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.listen(3000)
