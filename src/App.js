import React, { Component } from 'react'
import { Layout, Row, Col, Steps } from 'antd'

import elephant from './elephant.svg'

import Step1 from './components/steps/Step1'
import Step2 from './components/steps/Step2'
import Step3 from './components/steps/Step3'

const { Header, Footer, Content } = Layout
const { Step } = Steps

const steps = [{
  title: 'Memorize',
  description: 'Enter any text you want'
}, {
  title: 'Speak',
  description: 'Record what you remembered'
}, {
  title: 'Compare',
  description: 'See how well you performed!'
}]

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      current: 2
    }

    this.prev = this.prev.bind(this)
    this.next = this.next.bind(this)
    this.reset = this.reset.bind(this)
  }

  next () {
    const current = this.state.current + 1
    this.setState({ current })
  }

  prev () {
    const current = this.state.current - 1
    this.setState({ current })
  }

  reset () {
    this.setState({ current: 0 })
  }

  render () {
    const { current } = this.state
    return (
      <Layout>
        <Header className='header'>
          <Row type='flex' align='middle'>
            <img src={elephant} alt='Memospeak' className='header-logo' />
            <span className='header-name'>Memospeak</span>
          </Row>
        </Header>
        <Content className='content'>
          <Row gutter={16}>
            <Col span={24} xs={{ span: 24 }} lg={{ offset: 5, span: 14 }}>
              <Steps current={current}>
                {steps.map(item => <Step key={item.title} title={item.title} description={item.description}
                  className='step' />)}
              </Steps>
              <div className='steps-content'>
                {
                  this.state.current === 0 &&
                  <Step1 next={this.next} />
                }
                {
                  this.state.current === 1 &&
                  <Step2 next={this.next} />
                }
                {
                  this.state.current === 2 &&
                  <Step3 next={this.reset} />
                }
              </div>
            </Col>
          </Row>
        </Content>
        <Footer>&copy; The Mindhouse 2018</Footer>
      </Layout>
    )
  }
}

export default App
