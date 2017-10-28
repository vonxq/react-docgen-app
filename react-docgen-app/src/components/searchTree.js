import React from 'react'
import PropTypes from 'prop-types'
import { Tree, Input } from 'antd'
import './searchTree.css'
const TreeNode = Tree.TreeNode;
const Search = Input.Search;
/**
 * 根据dataSource生成可搜索的树，可定义onSelect回调
 */
class SearchTree extends React.Component {
  state = {
    expandedKeys: [],
    searchValue: '',
    autoExpandParent: true,
  }
  onExpand = (expandedKeys) => {
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  }
  onChange = (e) => {
    const { dataSource } = this.props    
    const value = e.target.value;
    const expandedKeys = this.getExpandedKey(value, dataSource)
    this.setState({
      expandedKeys,
      searchValue: value,
      autoExpandParent: true,
    })
  }
  getExpandedKey = (value, data) => {
    const re = []
    data.map((item) => {
      if (item.title.toLowerCase().indexOf(value.toLowerCase()) > -1) {
        re.push(item.key)
      }
      if (item.children) {
        const keys = this.getExpandedKey(value, item.children)
        re.push(...keys)
      }
    })
    return re
  }
  getDocPath = (key, data) => {
    const re = []
    data.map((item) => {
      if (item.key === key) {
        re.push(item.docpath)
        return re
      }
      if (item.children) {
        const docpath = this.getDocPath(key, item.children)
        re.push(...docpath)
        if(re.length >= 1){
          return re
        }
      }
    })
    return re
  }
  onSelect = (selectedKeys, e) => {
    if (selectedKeys.length === 0) {
      return
    }
    const { dataSource } = this.props 
    const docpath = this.getDocPath(selectedKeys[0], dataSource) 
    if(docpath[0] === selectedKeys[0]){
      this.props.onSelect(selectedKeys[0])
    }
  }
  componentWillReceiveProps = (nextProps) => {
    // 当根节点不同时expandKeys也要刷新
    if(nextProps.dataSource){
      if (!this.props.dataSource ||!this.props.dataSource[0] || ( nextProps.dataSource[0].key !== this.props.dataSource[0].key)) {
        this.setState({
          expandedKeys: nextProps.dataSource[0] ? [nextProps.dataSource[0].key] : [],
          autoExpandParent: true,
        })
      }
    }
  }
  
  // 生成组件树
  loop = (data) => data.map((item) => {
      const { searchValue, expandedKeys, autoExpandParent } = this.state
      const index = item.title.toLowerCase().indexOf(searchValue)
      const beforeStr = item.title.toLowerCase().substr(0, index)
      const afterStr = item.title.toLowerCase().substr(index + searchValue.length)
      const title = index > -1 ? (
        <span className="tree-node-title">
          {beforeStr}
          <span className="search-matched-title">{searchValue}</span>
          {afterStr}
        </span>
      ) : <span>{item.title}</span>;

      if (item.children) {
        return (
          <TreeNode className="tree-node" key={item.key} title={title}>
            {this.loop(item.children)}
          </TreeNode>
        )
      }
      return <TreeNode key={item.key} title={title} con={{docPath: item.docpath }} />;
    })
  render() {
    const { dataSource } = this.props
    const { searchValue, expandedKeys, autoExpandParent } = this.state
    return (
      <div>
        <Search style={{ marginBottom: 8, position: 'fixed' }} style={{width: '280px'}} placeholder="输入文件名or文件夹名快速搜索" onChange={this.onChange} />
        <div className="tree-wrapper-wrapper">
          <div className="tree-wrapper">
            <Tree
              onSelect={this.onSelect}
              onExpand={this.onExpand}
              expandedKeys={expandedKeys}
              autoExpandParent={autoExpandParent}
            >
              {dataSource[0] && this.loop(dataSource)}
            </Tree>
          </div>
        </div>
      </div>
    );
  }
}
SearchTree.propTypes = {
  /**
   * 要生成的组件
   * 格式: {children, key, title }
   * children为数组
   */
  dataSource: PropTypes.array.isRequired,
  /**
   * 当选中一个js组件文件时的回调函数，(docpath)=>{}
   */
  onSelect: PropTypes.func.isRequired,
}
export default SearchTree
