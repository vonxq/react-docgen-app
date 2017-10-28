import React from 'react'
import { message } from 'antd'
import PropTypes from 'prop-types'
import axios from 'axios'
import SearchTree from './searchTree'
/**
 * 容器组件，根据传入的dirpath获取文件夹解析结果，并交由searchTree组件展示
 * 可定义选中树某个节点的onSelect(selectedKey)回调
 */
class DirTree extends React.Component {
  state = {
    treeDataSource: [],
  }
  componentDidMount() {
    if(this.props.dirpath) {
      this.fetchInfosByDir(this.props.dirpath)
    }
  }
  componentWillReceiveProps = (nextProps) => {
    if(nextProps.dirpath) {
      this.fetchInfosByDir(nextProps.dirpath)      
    }
  }
  /**
   * 用于从服务器获取文件夹信息，之后将信息可提供给SearchTree渲染
   */
  fetchInfosByDir = (dir) => {
    axios.get('http://127.0.0.1:3000', {
      params:{
      path: dir}
    })
    .then( (response) => {
      if (response.data.infos.error){
        message.error(response.data.infos.error)
      } else{
        let treeDataSource = []
        treeDataSource.push(response.data.infos)
        this.setState({treeDataSource})
      }
    })
    .catch(function (error) {
      console.log("axios error", error)
    })
  }
  onTreeSelect = (selectedKey) => {
    if(this.props.onSelect){
      this.props.onSelect(selectedKey)
    }
  }
  render() {
    const { treeDataSource } = this.state
    return (
      <div>
        <SearchTree dataSource={treeDataSource} onSelect={this.onTreeSelect}/>
      </div>
    );
  }
}
DirTree.propTypes = {
  /**
   * 要解析的文件夹路径，必须是**绝对路径**
   */
  dirpath: PropTypes.string.isRequired,
  /**
   * 当选中一个js组件文件时的回调函数，(docpath)=>{}
   */
  onSelect: PropTypes.func.isRequired,
}
export default DirTree
