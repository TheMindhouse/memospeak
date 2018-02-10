import React, { Component } from 'react'
import {
  Row,
  Col,
  Button
} from 'antd'

import Diff from '../diff/Diff'
import WordStats from '../diff/WordStats'

const Step3 = (props) => {
  return (
    <div>
      <Row gutter={30}>
        <Col span={12}>
          <h2>Original</h2>
          <p className='diff-content'>{props.textOriginal}</p>
        </Col>
        <Col span={12}>
          <h2>Recorded</h2>
          <div className='diff-content'>
            <Diff diff={props.textDiff} modifyDiff={props.modifyDiff} />
          </div>
        </Col>
      </Row>

      <br /><br />

      <WordStats diff={props.textDiff} />

      <br /><br />
      <Button type='primary' size='large' onClick={() => props.next()}>Again</Button>
    </div>
  )
}

export default Step3
