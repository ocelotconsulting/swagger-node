#!/usr/bin/env node

const app = require('commander')
const edit = require('../lib/commands/edit')

app.version(require('../package.json').version)

app
  .command('edit [directory]')
  .description('Start the swagger editor service')
  .option('--host <host>', 'hostname, will default to localhost if not provided')
  .option('-p, --port <port>', 'the port to use, will default to a random available port if not provided')
  .option('--fileName <fileName>', 'path to the swagger.yaml file to edit')
  .option('--package <packagePath>', 'path to the package.json to use')
  .action(edit)

app.parse(process.argv)
