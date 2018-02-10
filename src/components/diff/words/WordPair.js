import React from 'react'

import {
  Button,
  Popover
} from 'antd'

const markWordAsCorrect = ({ id, missing, added, markAsCorrect }) => (
  <div>
    Expected: <b>{missing}</b><br />
    You said: <b>{added}</b><br /><br />
    <Button type='default' size='default' onClick={() => markAsCorrect(id)}>Mark as correct</Button>
  </div>
)

const WordPair = ({ id, missing, added, markAsCorrect }) => {
  return (
    <Popover placement='top' title='Incorrect word'
             content={markWordAsCorrect({ id, missing, added, markAsCorrect })}
             trigger='click'>
      <span className='diff-incorrect'>
        <span className='diff-word--missing'>{missing}</span>&nbsp;
        <span className='diff-word--added'>{added}</span>
      </span>
    </Popover>
  )
}

export default WordPair
