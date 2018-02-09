import React from 'react'
import PropTypes from 'prop-types'

const WordAdded = (props) => {
  return (
    <span className="text-error">{props.value}</span>
  )
}

WordAdded.propTypes = {}
WordAdded.defaultProps = {}

export default WordAdded
