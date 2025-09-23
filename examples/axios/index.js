require('bare-node-runtime/global')

const axios = require('axios', {
  with: { imports: 'bare-node-runtime/imports' }
})

axios.get('https://example.com').then((response) => {
  console.log(response.data)
})
