import React from 'react'
import {
  Select
} from 'antd'

import { exampleTexts } from '../../helpers/exampleTexts'

const { Option, OptGroup } = Select

const getLanguageOptions = (groupId, texts) => {
  return texts.map((text, textId) => <Option value={`${groupId}-${textId}`} key={textId}>{text[0]}</Option>)
}

const getLanguageGroups = (exampleTexts) => {
  return exampleTexts.map((group, id) => {
    return <OptGroup label={group.language} key={id}>
      {getLanguageOptions(id, group.texts)}
    </OptGroup>
  })
}

const SelectExample = (props) => {
  const handleSelect = (value) => {
    const lang = value.split('-')
    const groupId = lang[0]
    const textId = lang[1]
    const textObj = exampleTexts[groupId].texts[textId]
    const text = textObj[1]
    const languageCode = exampleTexts[groupId].languageCode
    props.onSelect({ text, languageCode})
  }

  return (
    <Select size='large' style={{ width: '100%' }} onChange={handleSelect} placeholder="Select example">
      {getLanguageGroups(exampleTexts)}
    </Select>
  )
}

SelectExample.propTypes = {}
SelectExample.defaultProps = {}

export default SelectExample
