import React from 'react';
import {
  Input,
  Button
} from 'antd';
const { TextArea } = Input;

class Step1 extends React.Component {
  saveText = (event) => {
    this.props.save(event.target.value)
  };

  render() {
    return (
      <div>
        <p>Paste the text you memorized:</p>
        <TextArea rows={10} onBlur={this.saveText} defaultValue={this.props.defaultText} />
        <br /> <br />
        <Button type='primary' size='large' onClick={this.props.next}>Next</Button>
      </div>
    )
  }
}

export default Step1
