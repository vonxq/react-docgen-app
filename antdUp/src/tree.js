import React from 'react'

import { Tree, Input } from 'antd';

const TreeNode = Tree.TreeNode;
const Search = Input.Search;

// const x = 3;
// const y = 2;
// const z = 1;
// const gData = [];

// const generateData = (_level, _preKey, _tns) => {
//   const preKey = _preKey || '0';
//   const tns = _tns || gData;

//   const children = [];
//   for (let i = 0; i < x; i++) {
//     const key = `${preKey}-${i}`;
//     tns.push({ title: key, key });
//     if (i < y) {
//       children.push(key);
//     }
//   }
//   if (_level < 0) {
//     return tns;
//   }
//   const level = _level - 1;
//   children.forEach((key, index) => {
//     tns[index].children = [];
//     return generateData(level, key, tns[index].children);
//   });
// };
// generateData(z);

// const dataList = [];
// const generateList = (data) => {
//   for (let i = 0; i < data.length; i++) {
//     const node = data[i];
//     const key = node.key;
//     dataList.push({ key, title: key });
//     if (node.children) {
//       generateList(node.children, node.key);
//     }
//   }
// };
// generateList(gData);

// const getParentKey = (key, tree) => {
//   let parentKey;
//   for (let i = 0; i < tree.length; i++) {
//     const node = tree[i];
//     if (node.children) {
//       if (node.children.some(item => item.key === key)) {
//         parentKey = node.key;
//       } else if (getParentKey(key, node.children)) {
//         parentKey = getParentKey(key, node.children);
//       }
//     }
//   }
//   return parentKey;
// };

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
    const { gData } = this.props    
    const value = e.target.value;
    const expandedKeys = this.getExpandedKey(value, gData)
    console.log('得到的值', value, expandedKeys)
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
  onTreeSelect = (selectedKeys, e) => {
    console.log(selectedKeys,e, 'select')
    const { gData } = this.props 
    const docpath = this.getDocPath(selectedKeys[0], gData) 
    console.log('docpath:', docpath[0], selectedKeys)
    if(docpath[0] === selectedKeys[0]){
      this.props.onSelect(selectedKeys[0])
      // console.log('可以解析', selectedKeys[0])
    }
  }
    // 遍历数组,找出key值与之相同的对象(节点)，执行callback函数
  // 若key值不匹配且含有children，则循环遍历
  // 否则不执行任何操作
  loop = (data) => data.map((item) => {
      const { searchValue, expandedKeys, autoExpandParent } = this.state
      const index = item.title.toLowerCase().indexOf(searchValue)
      const beforeStr = item.title.toLowerCase().substr(0, index)
      const afterStr = item.title.toLowerCase().substr(index + searchValue.length)
      const title = index > -1 ? (
        <span>
          {beforeStr}
          <span style={{ color: '#f50' }}>{searchValue}</span>
          {afterStr}
        </span>
      ) : <span>{item.title}</span>;

      if (item.children) {
        return (
          <TreeNode key={item.key} title={title}>
            {this.loop(item.children)}
          </TreeNode>
        )
      }
      return <TreeNode key={item.key} title={title} con={{docPath: item.docpath }} />;
    })
  render() {
    const { gData } = this.props
    console.log('gdata', gData)
    const { searchValue, expandedKeys, autoExpandParent } = this.state

    return (
      <div>
        <Search style={{ marginBottom: 8 }} placeholder="Search" onChange={this.onChange} />
        <Tree
          onSelect={this.onTreeSelect}
          onExpand={this.onExpand}
          expandedKeys={expandedKeys}
          autoExpandParent={autoExpandParent}
        >
          {gData[0] && this.loop(gData)}
        </Tree>
      </div>
    );
  }
}
export default SearchTree
