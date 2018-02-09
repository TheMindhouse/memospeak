import React, { Component } from 'react'
import {
  Row,
  Col,
  Progress,
  Button,
  Popover
} from 'antd'

const markWordAsCorrect = (
  <div>
    Expected: <b>dummy</b><br />
    You said: <b>yabba dabba doo</b><br /><br />
    <Button type='default' size='default'>Mark as correct</Button>
  </div>
)

const TEMP_TEXT = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
const TEMP_ERRORS = 1

class Step3 extends Component {
  constructor () {
    super()
    this.state = {
      wordsTotal: TEMP_TEXT.trim().split(/\s+/).length,
      wordsCorrect: TEMP_TEXT.trim().split(/\s+/).length - TEMP_ERRORS,
      wordsIncorrect: TEMP_ERRORS
    }
  }

  render () {
    const {
      wordsTotal,
      wordsCorrect,
      wordsIncorrect
    } = this.state
    return (
      <div>
        <Row gutter={30}>
          <Col span={12}>
            <h2>Original</h2>
            <p className='diff-content'>{TEMP_TEXT}</p>
          </Col>
          <Col span={12}>
            <h2>Recorded</h2>
            <p className='diff-content'>
              Lorem Ipsum is simply
              <Popover placement='top' title='Incorrect word' content={markWordAsCorrect} trigger='click'>
                &nbsp;
                <span className='diff-incorrect'>
                  <span className='text-missing'>dummy</span>&nbsp;
                  <span className='text-error'>yabba dabba doo</span>
                </span>
                &nbsp;
              </Popover>
              text of the printing and typesetting industry.
              Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer
              took a galley of type and scrambled it to make a type specimen book. It has survived not only five
              centuries, but also the leap into electronic typesetting, remaining
              essentially unchanged.
              It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
              and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </p>
          </Col>
        </Row>

        <br /><br />

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
            <Progress percent={parseInt(wordsCorrect / wordsTotal * 100)} />
          </Col>
        </Row>
        <br /><br />
        <Button type='primary' size='large' onClick={() => this.props.next()}>Again</Button>
      </div>
    )
  }
}

Step3.propTypes = {}
Step3.defaultProps = {}

export default Step3
