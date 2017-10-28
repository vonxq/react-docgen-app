import React from 'react'
import { Icon, Tooltip } from 'antd'
import PropTypes from 'prop-types'
import './address.css'
/**
 * 纯展示组件，展示组件地址信息 
 */
const Address = (props) => {
  return (
    <span>
        { `文档地址: ${props.address || '这是一个没有文档的荒原'} `}
    {/* {props.address && <Tooltip title={props.address}><Icon type="file"/></Tooltip>} */}
    </span>
  )
}
Address.propTypes = {
  address: PropTypes.string,
}
export default Address