import React, { Component } from 'react'
import { Layout, Row, Col } from 'antd'
import { StepsContainer } from './components/steps'
import AppHeader from './components/AppHeader'
import AppFooter from './components/AppFooter'

import diff from './helpers/diff'

const { Content } = Layout

const TEMP_RECORDING = 'love me like you do la la love me like you do'

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      original: 'Love me like you do la la love me like you do',
      transcript: TEMP_RECORDING,
      diff: '',
      language: 'en-US'
    }
  }

  componentDidMount () {
    this.compare()
  }

  compare = () => {
    this.setState({
      diff: diff(this.state.original, this.state.transcript),
    })
  }

  saveTranscript = (transcript) => {
    // this.setState({transcript}, this.compare);
    this.setState({ transcript: TEMP_RECORDING }, this.compare)
  }

  saveOriginal = (original) => {
    this.setState({ original })
  }

  modifyDiff = ({ id, part = null }) => {
    const diff = part
      ? [
        ...this.state.diff.slice(0, id),
        part,
        ...this.state.diff.slice(id + 1, this.state.diff.length)
      ]
      : [
        ...this.state.diff.slice(0, id),
        ...this.state.diff.slice(id + 1, this.state.diff.length)
      ]
    this.setState({ diff })
  }

  changeLanguage = (language) => {
    this.setState({ language })
  }

  render () {
    return (
      <Layout>
        <AppHeader />
        <Content className='content'>
          <Row gutter={16}>
            <Col span={24} xs={{ span: 24 }} md={{ offset: 2, span: 20 }} lg={{ offset: 5, span: 14 }}>
              <pre>
                {
                  JSON.stringify(this.state.diff, null, 2)
                }
              </pre>
              <StepsContainer
                original={this.state.original}
                transcript={this.state.transcript}
                diff={this.state.diff}
                modifyDiff={this.modifyDiff}
                saveOriginal={this.saveOriginal}
                onResult={this.saveTranscript}
                language={this.state.language}
                changeLanguage={this.changeLanguage}
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
