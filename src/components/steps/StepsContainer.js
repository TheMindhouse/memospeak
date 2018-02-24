import React, { Component } from 'react'
import { Steps } from 'antd'
import withSpeechRecognition from '../withSpeechRecognition'
import withAnalytics from '../withAnalytics'

import {
  Step1,
  Step2,
  Step3
} from './'

const { Step } = Steps

const steps = [{
  title: 'Memorize',
  description: 'Enter any text you know'
}, {
  title: 'Speak',
  description: 'Record what you memorized'
}, {
  title: 'Compare',
  description: 'See how well you performed!'
}]

const AVAILABLE_STEPS = {
  STEP_1: 0,
  STEP_2: 1,
  STEP_3: 2
}

class StepsContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      current: AVAILABLE_STEPS.STEP_1
    }

    this.goToStep = this.goToStep.bind(this)
  }

  goToStep (step) {
    this.setState({ current: step }, () => {
      this.props.analyticsAPI.event({
        action: `Go to Step ${step}`
      })
    })
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
              original={this.props.original}
              save={this.props.saveOriginal}
              next={() => this.goToStep(AVAILABLE_STEPS.STEP_2)}
              language={this.props.language}
              changeLanguage={this.props.changeLanguage}
            />
          }
          {
            this.state.current === 1 &&
            <Step2
              back={() => this.goToStep(AVAILABLE_STEPS.STEP_1)}
              next={() => this.goToStep(AVAILABLE_STEPS.STEP_3)}
              startRecording={this.props.startRecording}
              stopRecording={this.props.stopRecording}
              afterStopDelay={this.props.afterStopDelay}
              transcript={this.transcript}
            />
          }
          {
            this.state.current === 2 &&
            <Step3
              textOriginal={this.props.original}
              textDiff={this.props.diff}
              modifyDiff={this.props.modifyDiff}
              actionReset={() => this.goToStep(AVAILABLE_STEPS.STEP_1)}
              actionRecord={() => this.goToStep(AVAILABLE_STEPS.STEP_2)}
            />
          }
        </div>
      </div>
    )
  }
}

StepsContainer.propTypes = {}
StepsContainer.defaultProps = {}

export default withAnalytics(withSpeechRecognition(StepsContainer))
