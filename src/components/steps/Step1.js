import React from 'react'
import {
  Row,
  Col,
  Input,
  Button,
  Cascader
} from 'antd'

import { langs, getLangObject } from '../../helpers/languages'
import SelectExample from './SelectExample'

const { TextArea } = Input

// Prepare language data for Cascader element
const options = langs.map(lang => {
  if (lang.length > 2) {
    // Many language versions
    return {
      value: lang[0],
      label: lang[0],
      children: lang.slice(1, lang.length).map(version => {
        return {
          value: version[0],
          label: version[1]
        }
      })
    }
  }
  // Single language version
  return {
    value: lang[1][0],
    label: lang[0]
  }
})

const Step1 = (props) => {
  const saveText = (event) => {
    props.save(event.target.value)
  }

  const onLanguageChange = (value) => {
    const languageCode = value.length > 1 ? value[1] : value[0]
    props.changeLanguage(languageCode)
  }

  const onExampleSelect = ({ text, languageCode }) => {
    props.save(text)
    props.changeLanguage(languageCode)
  }

  return (
    <Row gutter={30} type='flex' justify='space-around' align='stretch'>
      <Col span={14} xs={{ span: 24 }} lg={{ span: 14 }}>
        <p>Paste the text you memorized:</p>
        <TextArea rows={10} onChange={saveText} className='textarea-original' value={props.defaultText} />
      </Col>

      <Col span={10} xs={{ span: 24 }} lg={{ span: 10 }}>

        <div style={{ marginBottom: '100px' }}>
          <p>or choose from examples:</p>
          <SelectExample onSelect={onExampleSelect} />
        </div>

        <Cascader
          options={options}
          size='large'
          style={{ width: 250 }}
          placeholder='Select language'
          onChange={onLanguageChange}
          expandTrigger='click'
          showSearch
          value={getLangObject(props.language)}
        />

        <br /> <br />

        <Button type='primary' size='large' onClick={props.next}>Next</Button>
      </Col>
    </Row>
  )
}

export default Step1
