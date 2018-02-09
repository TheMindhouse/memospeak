import React from 'react'
import {
  Input,
  Button
} from 'antd'
const { TextArea } = Input

const Step1 = (props) => {
  const saveText = (event) => {
    const text = event.target.value
    props.save(text)
  }

  return (
    <div>
      <p>Paste the text you memorized:</p>
      <TextArea rows={10} onBlur={saveText} defaultValue={props.defaultText} />
      <br /> <br />
      <Button type='primary' size='large' onClick={() => props.next()}>Next</Button>
    </div>
  )
}

Step1.propTypes = {}
Step1.defaultProps = {}

export default Step1
