import React from 'react'

import {
  Button,
  Popover
} from 'antd'

const markWordAsCorrect = ({ missing, added }) => (
  <div>
    Expected: <b>{missing}</b><br />
    You said: <b>{added}</b><br /><br />
    <Button type='default' size='default'>Mark as correct</Button>
  </div>
)

const WordPair = ({ missing, added }) => {
  return (
    <Popover placement='top' title='Incorrect word' content={markWordAsCorrect({missing, added})} trigger='click'>
      <span className='diff-incorrect'>
        <span className='diff-word--missing'>{missing}</span>&nbsp;
        <span className='diff-word--added'>{added}</span>
      </span>
    </Popover>
  )
}

export default WordPair
