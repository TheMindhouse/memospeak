import React from 'react'
import memospeakLogoNotWorking from '../assets/images/memospeak-logo-not-supported.svg'
import { Row } from 'antd'
import AppHeaderName from './AppHeaderName'
import './BrowserNotSupported.style.css'
import withAnalytics from './withAnalytics'

const BrowserNotSupported = (props) => {
  props.analyticsAPI.pageview('BrowserNotSupported')
  return (
    <Row type='flex' align='middle' justify='center' className='browser-not-supported'>
      <Row type='flex' align='middle' justify='center'>
        <img src={memospeakLogoNotWorking} className='browser-not-supported__logo' alt='Memospeak' />
        <AppHeaderName />
      </Row>
      <Row className='browser-not-supported__content'>
        <h1>We're sorry :(</h1>
        <h2>
          Memospeak is currently working only in <a href='https://www.google.com/chrome/'>Chrome for desktop</a> and <a href='https://play.google.com/store/apps/details?id=com.android.chrome'>Chrome for Android</a>.
        </h2>
      </Row>
    </Row>
  )
}

BrowserNotSupported.propTypes = {}
BrowserNotSupported.defaultProps = {}

export default withAnalytics(BrowserNotSupported)
