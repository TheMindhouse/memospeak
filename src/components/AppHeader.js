import React from 'react'
import elephant from '../elephant.svg'
import { Row, Layout } from 'antd'

const { Header } = Layout

const AppHeader = () => {
  return (
    <Header className='header'>
      <Row type='flex' align='middle'>
        <img src={elephant} alt='Memospeak' className='header-logo' />
        <span className='header-name'>Memospeak</span>
      </Row>
    </Header>
  )
}

AppHeader.propTypes = {}
AppHeader.defaultProps = {}

export default AppHeader
