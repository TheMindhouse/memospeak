import React, { Component } from 'react'
import { Layout, Row, Col } from 'antd'
import { StepsContainer } from './components/steps'
import AppHeader from './components/AppHeader'
import AppFooter from './components/AppFooter'

import diff from './helpers/diff'

const { Content } = Layout

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      original: 'His palms are sweaty, knees weak, arms are heavy \n' +
      'There\'s vomit on his sweater already, mom\'s spaghetti \n' +
      'He\'s nervous, but on the surface he looks calm and ready \n' +
      'To drop bombs, but he keeps on forgettin\' \n' +
      'What he wrote down, the whole crowd goes so loud \n' +
      'He opens his mouth, but the words won\'t come out \n' +
      'He\'s chokin\', how, everybody\'s jokin\' now \n' +
      'The clocks run out, times up, over, blaow!\n' +
      'Snap back to reality, oh there goes gravity \n' +
      'Oh, there goes Rabbit, he choked \n' +
      'He\'s so mad, but he won\'t give up that easy? No \n' +
      'He won\'t have it, he knows his whole back city\'s ropes ',
      transcript: '',
      diff: '',
      language: 'en-US'
    }
  }

  compare = () => {
    this.setState({
      diff: diff(this.state.original, this.state.transcript),
    })
  }

  saveTranscript = (transcript) => {
    this.setState({transcript}, this.compare);
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
