import React, { Component } from 'react'
import { Steps } from 'antd'
import withSpeechRecognition from '../withSpeechRecognition';

import {
  Step1,
  Step2,
  Step3
} from './'

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

class StepsContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      current: 2,
      wordStats: {
        wordsTotal: null,
        wordsCorrect: null,
        wordsIncorrect: null
      }
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
      <div>
        <Steps current={current}>
          {steps.map(item => <Step key={item.title} title={item.title} description={item.description}
            className='step' />)}
        </Steps>
        <div className='steps-content'>
          {
            this.state.current === 0 &&
            <Step1
              defaultText={this.props.original}
              save={this.props.saveOriginal}
              next={this.next}
            />
          }
          {
            this.state.current === 1 &&
            <Step2
              next={this.next}
              startRecording={this.props.startRecording}
              stopRecording={this.props.stopRecording}
              transcript={this.transcript}
            />
          }
          {
            this.state.current === 2 &&
            <Step3
              textOriginal={this.props.original}
              textDiff={this.props.diff}
              modifyDiff={this.props.modifyDiff}
              wordStats={this.state.wordStats}
              next={this.reset}
            />
          }
        </div>
      </div>
    )
  }
}

StepsContainer.propTypes = {}
StepsContainer.defaultProps = {}

export default withSpeechRecognition(StepsContainer);
