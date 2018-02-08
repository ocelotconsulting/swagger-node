const path = require('path')
const fs = require('fs')
const yaml = require('js-yaml')
const Url = require('url')
const startEditor = require('./startEditor')

const isRelativePath = path => path.startsWith('./') || path.startsWith('../')

const buildProject = (directory, options, cb) => {
  const fileName = findPackageFile(directory, options)

  const string = fs.readFileSync(fileName, { encoding: 'utf8' })
  const project = JSON.parse(string)

  project.filename = fileName
  project.dirname = path.dirname(fileName)

  if (!project.api) {
    project.api = {}
    project.api.name = project.name
    project.api.main = project.main
  }

  if (isRelativePath(options.fileName)) {
    project.api.swaggerFile = path.resolve(project.dirname, options.fileName || 'api/swagger/swagger.yaml')
  } else {
    project.api.swaggerFile = options.fileName
  }
  try {
    project.api.swagger = yaml.safeLoad(fs.readFileSync(project.api.swaggerFile, 'utf8'))
  } catch (e) {
    throw new Error(`Unable to open swagger file: ${project.api.swaggerFile}`)
  }
  project.api.host = project.api.swagger.host
  project.api.basePath = project.api.swagger.basePath
  project.api.localUrl = 'http://' + project.api.host + project.api.swagger.basePath
  project.api.port = Url.parse(project.api.localUrl).port || 80

  return project
}

const findPackageFile = (startDir, {packagePath}) => {
  let file
  if (!packagePath) {
    file = path.resolve(startDir || process.cwd(), 'package.json')
  } else {
    file = isRelativePath(packagePath) ? path.resolve(startDir || process.cwd(), packagePath) : packagePath
  }
  if (fs.existsSync(file)) {
    return file
  } else {
    throw new Error(`package.js not found in: ${parent}`)
  }
}

module.exports = (directory, options) => {
  console.info(options.port)
  try {
    startEditor(buildProject(directory, options), options)
  } catch (e) {
    console.error(`${e}`)
    throw e
  }
}
