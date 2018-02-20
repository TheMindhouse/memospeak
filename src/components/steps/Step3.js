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
        <Col xs={{ span: 24 }} md={{ span: 12 }}>
          <h2>Original</h2>
          <p className='diff-content'>{props.textOriginal}</p>
        </Col>
        <Col xs={{ span: 24 }} md={{ span: 12 }}>
          <h2>Recorded</h2>
          <div className='diff-content'>
            <Diff diff={props.textDiff} modifyDiff={props.modifyDiff} />
          </div>
        </Col>
      </Row>

      <br /><br />

      <WordStats diff={props.textDiff} />

      <br /><br />
      <Button type='primary' size='large' onClick={props.actionRecord}>Record again</Button>
      <br /><br />
      <Button type='default' size='large' onClick={props.actionReset}>Change text</Button>
    </div>
  )
}

export default Step3
