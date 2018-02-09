import React, { Component } from 'react'
import { Steps } from 'antd'

import {
  Step1,
  Step2,
  Step3
} from './'

const jsdiff = require('diff')

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

const TEXT_DEFAULT = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'

class StepsContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      current: 0,
      textOriginal: TEXT_DEFAULT,
      textRecorded: '',
      textDiff: null,
      wordStats: {
        wordsTotal: null,
        wordsCorrect: null,
        wordsIncorrect: null
      }
    }

    this.prev = this.prev.bind(this)
    this.next = this.next.bind(this)
    this.reset = this.reset.bind(this)
    this.saveOriginalText = this.saveOriginalText.bind(this)
    this.saveRecordedText = this.saveRecordedText.bind(this)
    this.compare = this.compare.bind(this)
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

  saveOriginalText (textOriginal) {
    this.setState({ textOriginal })
  }

  saveRecordedText (textRecorded) {
    this.setState({ textRecorded }, () => this.compare())
  }

  compare () {
    const {
      textOriginal,
      textRecorded
    } = this.state

    const textDiff = jsdiff.diffWordsWithSpace(textOriginal, textRecorded, {
      ignoreCase: true
    })

    this.setState({ textDiff })
  }

  render () {
    const { current } = this.state
    return (
      <div>
        <Steps current={current}>
          {steps.map(item => <Step key={item.title} title={item.title} description={item.description}
            className='step' />)}
        </Steps>
        <div className='steps-content'>
          {
            this.state.current === 0 &&
            <Step1
              defaultText={TEXT_DEFAULT}
              save={this.saveOriginalText}
              next={this.next} />
          }
          {
            this.state.current === 1 &&
            <Step2
              save={this.saveRecordedText}
              next={this.next}
            />
          }
          {
            this.state.current === 2 &&
            <Step3
              textOriginal={this.state.textOriginal}
              textRecorded={this.state.textRecorded}
              textDiff={this.state.textDiff}
              wordStats={this.state.wordStats}
              next={this.reset} />
          }
        </div>
      </div>
    )
  }
}

StepsContainer.propTypes = {}
StepsContainer.defaultProps = {}

export default StepsContainer
