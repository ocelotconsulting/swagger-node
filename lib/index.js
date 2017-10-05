import React from 'react'
import {render} from 'react-dom'
import 'swagger-editor/dist/swagger-editor.css'
import Editor from './components/Editor'

render(<Editor />, document.getElementById('swagger-editor'))
