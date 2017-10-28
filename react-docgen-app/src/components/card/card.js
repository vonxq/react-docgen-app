import React from 'react'
import PropTypes from 'prop-types'
import Address from './address'
import Title from './title'
import Description from './description'
import './card.css'
/**
 * 纯展示组件，用于展示组件信息。头部固定
 */
const Card = (props) => {
  const { description, title, address, content } = props
  return (
    <div className="card-root">
      <div className="card-head">
        <Title title={title}/>
        <Address address={address}/>
        <Description description={description} />
      </div>
      <div className="card-content">
        {content}
      </div>
    </div>
  )
}
Card.propTypes = {
  /**
   * 要解析的文件夹路径，必须是**绝对路径**
   */
  dirpath: PropTypes.string,
  description: PropTypes.any, 
  title: PropTypes.string, 
  address: PropTypes.string, 
  content: PropTypes.element,
}
export default Card
