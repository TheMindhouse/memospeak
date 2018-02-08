import React, { Component } from 'react';
import { Layout, Row, Col, Steps, Button, message } from 'antd';

import elephant from './elephant.svg'
const { Header, Footer, Content } = Layout;
const { Step } = Steps;

const steps = [{
  title: 'Enter text',
  description: 'Anything you want to memorize',
  content: 'First-content',
}, {
  title: 'Speak',
  description: 'Record what you remembered',
  content: 'Second-content',
}, {
  title: 'Compare',
  description: 'See how well you performed!',
  content: 'Last-content',
}];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
    };
  }

  next() {
    const current = this.state.current + 1;
    this.setState({ current });
  }

  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }

  render() {
    const { current } = this.state;
    return (
      <Layout>
        <Header className="header">
          <Row type="flex" align="middle">
            <img src={elephant} className="header-logo"/>
            <span className="header-name">Memospeak</span>
          </Row>
        </Header>
        <Content className="content">
          <Row gutter={16}>
            <Col span={24} xs={{ span: 24 }} lg={{ offset: 5, span: 14}}>
              <Steps current={current}>
                {steps.map(item => <Step key={item.title} title={item.title} description={item.description} className="step"/>)}
              </Steps>
              <div className="steps-content">{steps[this.state.current].content}</div>
              <div className="steps-action">
                {
                  this.state.current < steps.length - 1
                  &&
                  <Button type="primary" onClick={() => this.next()}>Next</Button>
                }
                {
                  this.state.current === steps.length - 1
                  &&
                  <Button type="primary" onClick={() => message.success('Processing complete!')}>Done</Button>
                }
                {
                  this.state.current > 0
                  &&
                  <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
                    Previous
                  </Button>
                }
              </div>
            </Col>
          </Row>
        </Content>
        <Footer>&copy; The Mindhouse 2018</Footer>
      </Layout>
    );
  }
}

export default App;
