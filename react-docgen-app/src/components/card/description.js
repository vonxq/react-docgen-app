import React from 'react'
import PropTypes from 'prop-types'
import './description.css'
/**
 * 纯展示组件，展示组件说明信息
 */
const Description = (props) => {
  return (
      <div className="description">{props.description || '此组件未编写说明'}</div>
  )
}
Description.propTypes = {
  description: PropTypes.any.isRequired,
}
export default Description