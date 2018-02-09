import React from 'react'
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

const Step3 = (props) => {
  return (
    <div>
      <Row gutter={30}>
        <Col span={12}>
          <h2>Original</h2>
          <p className='diff-content'>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer
            took a galley of type and scrambled it to make a type specimen book. It has survived not only five
            centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
            It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
          </p>
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
      <Row gutter={30}>
        <h3>
          Memorization level:
        </h3>
        <Col span={24} xs={{ span: 24 }} lg={{ offset: 6, span: 12 }}>
          <Progress percent={90} />
        </Col>
      </Row>
      <br /><br />
      <Button type='primary' size='large' onClick={() => props.next()}>Again</Button>
    </div>
  )
}

Step3.propTypes = {}
Step3.defaultProps = {}

export default Step3
