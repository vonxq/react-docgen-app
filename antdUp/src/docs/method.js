import React from 'react'
import { render } from 'react-dom'
import { Table, Badge } from 'antd'
class Doc extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  arrayToString = (arr) => {
    let re = ''
    for(let i in arr) {
      re += `${arr[i].name}:${arr[i].type},`
    }
    return re
  }
  render () {
    const { methods } = this.props
    console.log('methood',methods)
    const { docblock, modifiers, params, returns } = methods[0]// 数组有很多项
    let dataSource = []    
    for (let i in methods) {
      let { modifiers,...item } = methods[i]
      if(!item.description){
        item.description = 'no'
      }
      if(item.params){
        item.params = this.arrayToString(item.params)
      }
      console.log(methods[i], 'i')
      dataSource.push(item)      
    }
    console.log(dataSource, 'da')
    const columns = [
      {
        title: "方法名",
        dataIndex: 'name',
        key: 'name',
        width: '50',
      },      
      {
        title: '说明',
        dataIndex: 'description',
        key: 'description',
        width: '50',        
      },
      {
        title: 'params',
        dataIndex: 'params',
        key: 'params',
        width: '50',        
      },
      {
        title: 'returns',
        dataIndex: 'returns',
        key: 'returns',
        width: '50',        
      },

    ]
    return (
      <div>
        <Table size="small" bordered style={{width: '400px'}} dataSource={dataSource} columns={columns} />
      </div>
    )
  }
}
export default Doc