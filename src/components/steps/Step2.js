import React, { Component } from 'react';

import {
  Button,
  Progress,
  Spin,
} from 'antd';

// Convert seconds to format mm:ss
const formatTime = seconds => `${parseInt(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`

class Step2 extends Component {
  TIME_DEFAULT = 60

  constructor() {
    super()
    this.state = {
      recording: false,
      finishedRecording: false,
      secondsLeft: this.TIME_DEFAULT,
    }

    this.timer = null

    this.startRecording = this.startRecording.bind(this)
    this.stopRecording = this.stopRecording.bind(this)
  }

  startRecording() {
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

  stopRecording() {
    this.setState({ recording: false, finishedRecording: true })
    clearInterval(this.timer)
    setTimeout(() => {
        this.props.next()
    }, 3000)
  }

  render() {
    return (
      <div>
        {
          !this.state.recording && !this.state.finishedRecording
          &&
          <div>
            <p>Click Record button when ready. You will have 1 minute to finish.<br />Good luck!</p>
            <Button type="primary" onClick={this.startRecording}>Record</Button>
          </div>
        }
        {
          this.state.recording
          &&
          <div>
            <h2>Recording...</h2>
            <Progress type="circle" percent={this.state.secondsLeft / this.TIME_DEFAULT * 100}
                      format={percent => formatTime(this.state.secondsLeft)} />
            <br/><br/>
            <Button type="default" size="default" onClick={() => this.stopRecording()}>Stop</Button>
          </div>
        }
        {
          this.state.finishedRecording
          &&
          <div>
            <Spin />
            <br/><br/>
            <h3><b>Finished recording</b></h3>
            <p>Checking your results...</p>
          </div>
        }
      </div>
    );
  }
}

Step2.propTypes = {};
Step2.defaultProps = {};

export default Step2;