import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import AppWrapper from './AppWrapper'
import registerServiceWorker from './registerServiceWorker'

// Require HTTPS
if (window.location.protocol !== 'https:') {
  window.location = 'https://' + window.location.host
}

ReactDOM.render(<AppWrapper />, document.getElementById('root'))
registerServiceWorker()
