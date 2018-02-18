import React, { Component } from 'react'
import { Layout, Row, Col } from 'antd'
import { StepsContainer } from './components/steps'
import AppHeader from './components/AppHeader'
import AppFooter from './components/AppFooter'

import diff from './helpers/diff'

const { Content } = Layout

const EXAMPLE_TEXT = `Yo
His palms are sweaty, knees weak, arms are heavy 
There's vomit on his sweater already, mom's spaghetti 
He's nervous, but on the surface he looks calm and ready 
To drop bombs, but he keeps on forgettin' 
What he wrote down, the whole crowd goes so loud 
He opens his mouth, but the words won't come out 
He's chokin', how, everybody's jokin' now 
The clocks run out, times up, over, blaow!
Snap back to reality, oh there goes gravity 
Oh, there goes Rabbit, he choked 
He's so mad, but he won't give up that easy? No 
He won't have it, he knows his whole back city's ropes 
It don't matter, 
He's dope, he knows that, but he's broke 
He's so stacked that he knows 
When he goes back to his mobile home, that's when it's 
Back to the lab again yo, this whole rhapsody 
He better go capture this moment and hope it don't pass him`

const EXAMPLE_TEXT_LANG = 'en-US'

const LOCAL_STORAGE_TEXT = 'cachedText'
const LOCAL_STORAGE_LANG = 'cachedLanguage'

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      original: localStorage.getItem(LOCAL_STORAGE_TEXT) || EXAMPLE_TEXT,
      transcript: '',
      diff: '',
      language: localStorage.getItem(LOCAL_STORAGE_LANG) || EXAMPLE_TEXT_LANG
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
    if (original !== EXAMPLE_TEXT) {
      localStorage.setItem(LOCAL_STORAGE_TEXT, original)
    }
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
    if (language !== EXAMPLE_TEXT_LANG) {
      localStorage.setItem(LOCAL_STORAGE_LANG, language)
    }
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
