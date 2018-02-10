import React from 'react'

import {
  Button,
  Popover
} from 'antd'

const removeWord = ({ id, value, markAsCorrect }) => (
  <div>
    You added unnecessary word<br />
    <b>{value}</b>
    <br /><br />
    <Button type='default' size='default' onClick={() => markAsCorrect(id)}>Remove the word</Button>
  </div>
)

const WordAdded = ({ id, value, markAsCorrect }) => {
  return (
    <Popover placement='top' title='Extra word added' content={removeWord({ id, value, markAsCorrect })} trigger='click'>
      <span className='diff-incorrect'>
        <span className='diff-word--added'>{value}</span>
      </span>
    </Popover>
  )
}

export default WordAdded
