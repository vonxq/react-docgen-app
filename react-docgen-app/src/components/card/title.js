import React from 'react'
import PropTypes from 'prop-types'
import './title.css'
/**
 * 纯展示组件，展示title信息
 */
const Title = (props) => {
  return (
      <div className="title">{props.title}</div>
  )
}
Title.propTypes = {
  title: PropTypes.string.isRequired,
}
export default Title