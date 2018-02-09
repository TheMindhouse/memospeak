import React from 'react'
import PropTypes from 'prop-types'

const WordMissing = ({value}) => {
  return (
    <span className="text-missing">{value}&nbsp;</span>
  )
}

WordMissing.propTypes = {}
WordMissing.defaultProps = {}

export default WordMissing
