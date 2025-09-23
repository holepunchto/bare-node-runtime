require('bare-node-runtime/global')

const { default: chalk } = require('chalk', {
  with: { imports: 'bare-node-runtime/imports' }
})

console.log(chalk.blue('Hello world!'))
