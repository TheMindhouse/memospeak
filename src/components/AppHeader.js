import React from 'react'
import logo from '../assets/images/memospeak-logo.png'
import { Row } from 'antd'

const AppHeader = () => {
  return (
    <Row type='flex' align='middle' justify='center' className="header">
      <img src={logo} alt='Memospeak' className='header-logo' />
      <div>
        <span className='header-name'>Memospeak</span>
        <span className='header-subtitle'>Train your memory by memorizing texts</span>
      </div>
    </Row>
  )
}

AppHeader.propTypes = {}
AppHeader.defaultProps = {}

export default AppHeader
