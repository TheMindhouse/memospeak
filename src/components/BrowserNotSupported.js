import React from 'react'
import memospeakLogoNotWorking from '../assets/images/memospeak-logo-not-supported.svg'
import { Row } from 'antd'
import AppHeaderName from './AppHeaderName'
import './BrowserNotSupported.style.css'

const BrowserNotSupported = () => {
  return (
    <Row type='flex' align='middle' justify='center' className='browser-not-supported'>
      <Row type='flex' align='middle' justify='center'>
        <img src={memospeakLogoNotWorking} className='browser-not-supported__logo' />
        <AppHeaderName />
      </Row>
      <Row className='browser-not-supported__content'>
        <h1>We're sorry :(</h1>
        <h2>
          Memospeak is currently working only in Chrome for desktop.
        </h2>
        <h4>We're gonna make it work, but for now you can <a href="https://www.google.com/chrome/">download Chrome</a></h4>
      </Row>
    </Row>
  )
}

BrowserNotSupported.propTypes = {}
BrowserNotSupported.defaultProps = {}

export default BrowserNotSupported
