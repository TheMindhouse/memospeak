import React, { Component } from 'react';

import {
  Button,
  Progress,
} from 'antd';

// Convert seconds to format mm:ss
const formatTime = seconds => `${parseInt(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`

class Step2 extends Component {
  TIME_DEFAULT = 60

  constructor() {
    super()
    this.state = {
      recording: false,
      secondsLeft: this.TIME_DEFAULT,
    }

    this.timer = null

    this.startRecording = this.startRecording.bind(this)
    this.stopRecording = this.stopRecording.bind(this)
  }

  startRecording() {
    this.setState({ recording: true })
    this.timer = setInterval(() => {
        this.setState({ secondsLeft: this.state.secondsLeft - 1})
    }, 1000)
  }

  stopRecording() {
    this.setState({ recording: false })
    clearInterval(this.timer)
  }

  render() {
    return (
      <div>
        <p>Click Record button when ready. You will have 1 minute to finish.<br />Good luck!</p>
        {
          !this.state.recording
          &&
          <Button type="primary" onClick={this.startRecording}>Record</Button>
        }
        {
          this.state.recording
          &&
          <Progress type="circle" percent={this.state.secondsLeft / this.TIME_DEFAULT * 100} format={percent => formatTime(this.state.secondsLeft)} onClick={this.stopRecording} />
        }
      </div>
    );
  }
}

Step2.propTypes = {};
Step2.defaultProps = {};

export default Step2;