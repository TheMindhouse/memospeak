import React from 'react'
import App from './App'
import BrowserNotSupported from './components/BrowserNotSupported'

const AppWrapper = () => {
  const speechRecognitionApi = window.SpeechRecognition || window.webkitSpeechRecognition
  const displayedApp = speechRecognitionApi ? <App /> : <BrowserNotSupported />
  return (
    <div>
      {displayedApp}
    </div>
  )
}

AppWrapper.propTypes = {}
AppWrapper.defaultProps = {}

export default AppWrapper
