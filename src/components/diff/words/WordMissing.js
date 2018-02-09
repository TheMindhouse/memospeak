import React from 'react'

import {
  Button,
  Popover
} from 'antd'

const addWord = (word) => (
  <div>
    You didn't say the word<br />
    <b>{word}</b>
    <br /><br />
    <Button type='default' size='default'>Add the word</Button>
  </div>
)

const WordMissing = ({ value }) => {
  return (
    <Popover placement='top' title='Missing word' content={addWord(value)} trigger='click'>
      <span className='diff-incorrect'>
        <span className='text-missing'>{value}</span>
      </span>
    </Popover>
  )
}

export default WordMissing
