import React, { Component } from 'react'
import { Layout, Row, Col } from 'antd'
import { StepsContainer } from './components/steps'
import AppHeader from './components/AppHeader'
import AppFooter from './components/AppFooter'

const jsdiff = require('diff');

const { Content } = Layout

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      original: '',
      transcript: '',
      diff: '',
    }
  }

  compare = () => {
    const diff = jsdiff.diffWordsWithSpace(
      this.state.original,
      this.state.transcript,
      {
        ignoreCase: true,
      }
    );
    this.setState({ diff });
  }

  saveTranscript = (transcript) => {
    this.setState({transcript}, this.compare);
  }

  saveOriginal = (original) => {
    this.setState({original});
  }

  render () {
    return (
      <Layout>
        <AppHeader />
        <Content className='content'>
          <Row gutter={16}>
            <Col span={24} xs={{ span: 24 }} md={{ offset: 2, span: 20 }} lg={{ offset: 5, span: 14 }}>
              <StepsContainer
                original={this.state.original}
                transcript={this.state.transcript}
                diff={this.state.diff}
                saveOriginal={this.saveOriginal}
                onResult={this.saveTranscript}
              />
            </Col>
          </Row>
        </Content>
        <AppFooter />
      </Layout>
    )
  }
}

export default App
