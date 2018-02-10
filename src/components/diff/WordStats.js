import React from 'react'
import {
  Row,
  Col,
  Progress
} from 'antd'

const calculate = (diff) => {
  if (!diff) {
    return {}
  }
  return diff.reduce((previousValue, currentValue) => {
    const {
      text,
      remove
    } = currentValue

    if (text) {
      return {
        ...previousValue,
        wordsTotal: previousValue.wordsTotal + text.split(' ').length,
        wordsCorrect: previousValue.wordsCorrect + text.split(' ').length
      }
    }

    if (remove) {
      return {
        ...previousValue,
        wordsTotal: previousValue.wordsTotal + remove.split(' ').length,
        wordsIncorrect: previousValue.wordsIncorrect + remove.split(' ').length
      }
    }

    return previousValue
  }, {
    wordsTotal: 0,
    wordsCorrect: 0,
    wordsIncorrect: 0
  })
}

const WordStats = ({ diff }) => {
  const {
    wordsTotal,
    wordsCorrect,
    wordsIncorrect
  } = calculate(diff)

  return (
    <Row gutter={30}>
      <Col span={24} xs={{ span: 24 }} md={{ offset: 2, span: 20 }} lg={{ offset: 6, span: 12 }}>
        <Row gutter={30}>
          <Col xs={{ span: 24 }} md={{ span: 8 }}>
            <h3>Total words</h3>
            <Progress type='circle'
              status='active'
              percent={100}
              width={80}
              format={() => wordsTotal} />
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 8 }}>
            <h3>Correct</h3>
            <Progress type='circle'
              status='success'
              percent={wordsCorrect / wordsTotal * 100}
              width={80}
              format={() => wordsCorrect} />
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 8 }}>
            <h3>Incorrect</h3>
            <Progress type='circle'
              status='exception'
              percent={wordsIncorrect / wordsTotal * 100}
              width={80}
              format={() => wordsIncorrect} />
          </Col>
        </Row>
        <br /><br />
        <h3>Memorization level:</h3>
        <Progress percent={parseInt(wordsCorrect / wordsTotal * 100, 10)} />
      </Col>
    </Row>
  )
}

WordStats.propTypes = {}
WordStats.defaultProps = {}

export default WordStats
