import React from 'react'

import {
  Button,
  Popover
} from 'antd'

const removeWord = (word) => (
  <div>
    You added unnecessary word<br />
    <b>{word}</b>
    <br /><br />
    <Button type='default' size='default'>Remove the word</Button>
  </div>
)

const WordAdded = ({ value }) => {
  return (
    <Popover placement='top' title='Extra word added' content={removeWord(value)} trigger='click'>
      <span className='diff-incorrect'>
        <span className='text-error'>{value}</span>
      </span>
    </Popover>
  )
}

export default WordAdded
