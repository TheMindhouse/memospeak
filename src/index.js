import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import AppWrapper from './AppWrapper'
import registerServiceWorker from './registerServiceWorker'
import ReactGA from 'react-ga'

// Require HTTPS
if (window.location.protocol !== 'https:') {
  window.location = 'https://' + window.location.host
}

// Connect Analytics
ReactGA.initialize('UA-114455758-1')

ReactDOM.render(<AppWrapper />, document.getElementById('root'))
registerServiceWorker()
