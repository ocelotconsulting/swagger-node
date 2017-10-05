import React, { Component } from 'react'
import SwaggerEditor from 'swagger-editor'
import PersistToBackend from '../plugins/PersistToBackend'

const domId = 'swagger-ui-mountpoint'

export default class Editor extends Component {
  componentDidMount () {
    SwaggerEditor({
      dom_id: `#${domId}`,
      url: '/swagger.yaml',
      plugins: [
        PersistToBackend
      ]
    })
  }
  render () {
    return (
      <div className="App">
        <div id={domId} />
      </div>
    )
  }
}

Editor.displayName = 'Editor'
