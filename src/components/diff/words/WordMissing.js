import React from 'react'

import {
  Button,
  Popover
} from 'antd'

const addWord = ({ id, value, markAsCorrect }) => (
  <div>
    You didn't say the word<br />
    <b>{value}</b>
    <br /><br />
    <Button type='default' size='default' onClick={() => markAsCorrect(id)}>Add the word</Button>
  </div>
)

const WordMissing = ({ id, value, markAsCorrect }) => {
  return (
    <Popover placement='top' title='Missing word' content={addWord({ id, value, markAsCorrect })} trigger='click'>
      <span className='diff-incorrect'>
        <span className='diff-word--missing'>{value}</span>
      </span>
    </Popover>
  )
}

export default WordMissing
