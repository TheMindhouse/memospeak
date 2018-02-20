import React from 'react'

import {
  Button,
  Popover
} from 'antd'

const markWordAsCorrect = ({ id, missing, added, markAsCorrect }) => (
  <div>
    You said: <b>{added}</b><br />
    Expected: <b>{missing}</b><br /><br />
    <Button type='default' size='default' onClick={() => markAsCorrect(id)}>Mark as correct</Button>
  </div>
)

const WordPair = ({ id, missing, added, markAsCorrect }) => {
  return (
    <Popover placement='top' title='Incorrect word'
             content={markWordAsCorrect({ id, missing, added, markAsCorrect })}
             trigger='click'>
      <span className='diff-incorrect'>
        <span className='diff-word--added'>{added}</span>
        <span className='diff-word--ignored'>&#8594;</span>
        <span className='diff-word--missing'>{missing}</span>
      </span>
      &nbsp;
    </Popover>
  )
}

export default WordPair
