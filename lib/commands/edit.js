const path = require('path')
const fs = require('fs')
const yaml = require('js-yaml')
const Url = require('url')
const startEditor = require('./startEditor')

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

  project.api.swaggerFile = path.resolve(project.dirname, options.fileName || 'api/swagger/swagger.yaml')
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

const findPackageFile = (startDir) => {
  const parent = startDir || process.cwd()
  const file = path.resolve(parent, 'package.json')
  if (fs.existsSync(file)) {
    return file
  } else {
    throw new Error(`package.js not found in: ${parent}`)
  }
}

module.exports = (directory, options) => {
  try {
    startEditor(buildProject(directory, options), options)
  } catch (e) {
    console.error(`${e}`)
  }
}
