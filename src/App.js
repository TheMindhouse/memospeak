import React, { Component } from 'react'
import { Layout, Row, Col } from 'antd'
import { StepsContainer } from './components/steps'
import AppHeader from './components/AppHeader'
import AppFooter from './components/AppFooter'

const { Content } = Layout

class App extends Component {
  render () {
    return (
      <Layout>
        <AppHeader />
        <Content className='content'>
          <Row gutter={16}>
            <Col span={24} xs={{ span: 24 }} lg={{ offset: 5, span: 14 }}>
              <StepsContainer />
            </Col>
          </Row>
        </Content>
        <AppFooter />
      </Layout>
    )
  }
}

export default App
