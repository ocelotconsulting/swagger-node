#!/usr/bin/env node

const app = require('commander')
const edit = require('../lib/commands/edit')

app.version(require('../package.json').version)

app
  .command('edit [directory]')
  .description('Start the swagger editor service')
  .option('--host <host>', 'hostname')
  .option('-p, --port <port>', 'port')
  .option('--fileName <fileName>')
  .action(edit)

app.parse(process.argv)
