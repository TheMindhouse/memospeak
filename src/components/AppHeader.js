import React from 'react'
import logo from '../assets/images/memospeak-logo.svg'
import { Row } from 'antd'
import AppHeaderName from './AppHeaderName'

const AppHeader = () => {
  return (
    <Row type='flex' align='middle' justify='center' className="header">
      <img src={logo} alt='Memospeak' className='header-logo' />
      <AppHeaderName />
    </Row>
  )
}

AppHeader.propTypes = {}
AppHeader.defaultProps = {}

export default AppHeader
