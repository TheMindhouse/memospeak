import React from 'react';
import { Input } from 'antd';
const { TextArea } = Input;

const Step1 = (props) => {
  return (
    <div>
      <p>Paste the text you memorized:</p>
      <TextArea rows={10} />
    </div>
  );
};

Step1.propTypes = {};
Step1.defaultProps = {};

export default Step1;
