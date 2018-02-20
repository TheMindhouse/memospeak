import React, { Component } from 'react'
import { Layout, Row, Col } from 'antd'
import { StepsContainer } from './components/steps'
import AppHeader from './components/AppHeader'
import AppFooter from './components/AppFooter'

import diff from './helpers/diff'

const { Content } = Layout

const LOCAL_STORAGE_TEXT = 'cachedText'
const LOCAL_STORAGE_LANG = 'cachedLanguage'

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      original: localStorage.getItem(LOCAL_STORAGE_TEXT),
      transcript: '',
      tempTranscript: '',
      diff: '',
      tempDiff: '',
      language: localStorage.getItem(LOCAL_STORAGE_LANG)
    }
  }

  compare = () => {
    this.setState({
      diff: diff(this.state.original, this.state.transcript),
    })
  }

  saveTranscript = (transcript) => {
    this.setState({ transcript }, this.compare)
  }

  saveOriginal = (original) => {
    this.setState({ original })

    // Cache entered text
    localStorage.setItem(LOCAL_STORAGE_TEXT, original)
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

    // Cache chosen language
    localStorage.setItem(LOCAL_STORAGE_LANG, language)
  }

  render () {
    return (
      <Layout>
        <AppHeader />
        <Content className='content'>
          <Row gutter={16}>
            <Col span={24}
                 xs={{ span: 24 }}
                 md={{ offset: 2, span: 20 }}
                 xl={{ offset: 4, span: 16 }}
                 xxl={{ offset: 5, span: 14 }}>
              <StepsContainer
                original={this.state.original}
                transcript={this.state.transcript}
                diff={this.state.diff}
                modifyDiff={this.modifyDiff}
                saveOriginal={this.saveOriginal}
                onEnd={this.saveTranscript}
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
