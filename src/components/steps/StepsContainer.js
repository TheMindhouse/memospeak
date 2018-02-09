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

const TEXT_DEFAULT = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'

class StepsContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      current: 0,
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
              defaultText={TEXT_DEFAULT}
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
