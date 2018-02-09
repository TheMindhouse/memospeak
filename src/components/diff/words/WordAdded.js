import React from 'react'
import PropTypes from 'prop-types'

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

WordAdded.propTypes = {}
WordAdded.defaultProps = {}

export default WordAdded
