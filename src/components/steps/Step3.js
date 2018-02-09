import React from 'react'
import {
  Row,
  Col,
  Progress,
  Button
} from 'antd'

const Step3 = (props) => {
  return (
    <div>
      <Row gutter={30}>
        <Col span={12}>
          <h2>Original</h2>
          <p>
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
          <p>
            Lorem Ipsum is simply <span className='text-error'>yabba dabba</span> text of the printing and typesetting industry.
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
        <Col span={24} xs={{ span: 24 }} lg={{ offset: 6, span: 12}}>
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
