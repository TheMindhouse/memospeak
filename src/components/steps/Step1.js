import React from 'react'
import {
  Input,
  Button,
  Cascader
} from 'antd'

import { langs, getLangObject } from '../../helpers/languages'

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

  return (
    <div>
      <p>Paste the text you memorized:</p>
      <TextArea rows={10} onBlur={saveText} defaultValue={props.defaultText} />

      <br /> <br />

      <Cascader
        options={options}
        size='large'
        style={{ width: 250 }}
        placeholder='Select language'
        onChange={onLanguageChange}
        expandTrigger='click'
        showSearch
        defaultValue={getLangObject(props.language)}
      />

      <br /> <br />

      <Button type='primary' size='large' onClick={props.next}>Next</Button>
    </div>
  )
}

export default Step1
