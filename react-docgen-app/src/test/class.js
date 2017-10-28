import React from 'react'
import PropTypes from 'prop-types'
/**
 * 这是一个test组件
 */
class Test extends React.Component {
  state = {
  }
  /**
   * 用于从服务器获取文件夹信息，之后将信息可提供给SearchTree渲染
   */
  fetchInfosByDir = (dir) => {
  }
  render() {
    return (
      <div>
      </div>
    );
  }
}
Test.propTypes = {
  /**
   * 要解析的文件夹路径，必须是**绝对路径**
   */
  dirpath: PropTypes.string.isRequired,
  /**
   * 当选中一个js组件文件时的回调函数，(docpath)=>{}
   */
  onSelect: PropTypes.func.isRequired,
}
export default Test
