import superagent from 'superagent'

export const updateSpec = (ori) => (...args) => {
  let [spec] = args
  ori(...args)
  saveContentToStorage(spec)
}

export default (system) => ({
  statePlugins: {
    spec: {
      wrapActions: {
        updateSpec
      }
    }
  }
})

const saveContentToStorage = (str) => {
  superagent.put('/swagger.yaml')
    .send({yaml: str})
    .then(_ => {
      console.info('sent the swagger into')
    })
    .catch(e => console.error(e))
}
