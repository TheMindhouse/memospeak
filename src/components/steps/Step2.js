import React, { Component } from 'react'

import {
  Button,
  Progress,
  Spin
} from 'antd'

const TEMP_TEXT_RECORDED = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the yabba dabba doo text ever since the 1500s, when an unknown uhmmm printer took a galley of type and I forgot it damn it ah yes to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'

// Initial recording time in seconds
const TIME_DEFAULT = 60

// Convert seconds to format mm:ss
const formatTime = seconds => `${parseInt(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`

class Step2 extends Component {
  constructor () {
    super()
    this.state = {
      recording: false,
      finishedRecording: false,
      secondsLeft: TIME_DEFAULT
    }

    this.timer = null

    this.startRecording = this.startRecording.bind(this)
    this.stopRecording = this.stopRecording.bind(this)
  }

  startRecording () {
    this.setState({ recording: true })
    this.timer = setInterval(() => {
      const secondsLeft = this.state.secondsLeft - 1
      if (secondsLeft < 0) {
        this.stopRecording()
      } else {
        this.setState({ secondsLeft })
      }
    }, 1000)
  }

  stopRecording () {
    this.setState({ recording: false, finishedRecording: true })

    // Todo - pass actual recorded text
    const textRecorded = TEMP_TEXT_RECORDED
    this.props.save(textRecorded)

    clearInterval(this.timer)
    setTimeout(() => {
      this.props.next()
    }, 1000)
  }

  render () {
    return (
      <div>
        {
          !this.state.recording && !this.state.finishedRecording &&
          <div>
            <p>Click Record button when ready. You will have 1 minute to finish.<br />Good luck!</p>
            <Button type='primary' onClick={this.startRecording}>Record</Button>
          </div>
        }
        {
          this.state.recording &&
          <div>
            <h2>Recording...</h2>
            <Progress type='circle' percent={this.state.secondsLeft / TIME_DEFAULT * 100}
              format={percent => formatTime(this.state.secondsLeft)} />
            <br /><br />
            <Button type='default' size='default' onClick={() => this.stopRecording()}>Stop</Button>
          </div>
        }
        {
          this.state.finishedRecording &&
          <div>
            <Spin />
            <br /><br />
            <h3><b>Finished recording</b></h3>
            <p>Checking your results...</p>
          </div>
        }
      </div>
    )
  }
}

Step2.propTypes = {}
Step2.defaultProps = {}

export default Step2
