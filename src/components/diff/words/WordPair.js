import React from 'react'
import PropTypes from 'prop-types'

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
        <span className='text-missing'>{missing}</span>&nbsp;
        <span className='text-error'>{added}</span>
      </span>
    </Popover>
  )
}

WordPair.propTypes = {}
WordPair.defaultProps = {}

export default WordPair
