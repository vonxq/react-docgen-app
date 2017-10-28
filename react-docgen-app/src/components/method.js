import React from 'react'
import { render } from 'react-dom'
import { Table, Badge } from 'antd'
import { markdown } from 'markdown'
import PropTypes from 'prop-types'
import './table.css'
/**
 * 展示组件，接受一个methods数组，解析并展示信息在table上
 */
class Method extends React.Component {
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
  markdownToHtml = (sentence) => {
    const html = markdown.toHTML(sentence)
    return (<div dangerouslySetInnerHTML={{__html: html}}/>)
  }
  getRowClassName = (record, index) => {
    return index%2 === 0 ? 'single-row' : 'double-row'
  }
  handleFilter = (value, record) => {
    if(value === 'true') {
      return record.description.length === 0
    }
    return !(record.description.length === 0)
  }
  render () {
    const { methods } = this.props
    if(!methods || !methods[0] ) {
      return <h3>no methods</h3>
    }
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
      dataSource.push(item)      
    }
    const columns = [
      {
        title: <span className="table-title">方法名</span>,
        dataIndex: 'name',
        key: 'name',
        width: '20%',
        sorter: (a, b) => a.name.localeCompare(b.name),        
      },      

      {
        title:  <span className="table-title">参数</span>,
        dataIndex: 'params',
        key: 'params',
        width: '20%',        
      },
      {
        title:  <span className="table-title">返回值</span>,
        dataIndex: 'returns',
        key: 'returns',
        width: '10%',        
      },
      {
        title:  <span className="table-title">说明</span>,
        dataIndex: 'description',
        key: 'description',
        width: '50%',  
        render: (text) => this.markdownToHtml(text) ,  
        filters: [
          {text: '有说明的',
          value: true,},
          {text: '没说明的',
          value: false,},
        ],
        onFilter: this.handleFilter ,  
      },

    ]
    return (
      <div>
        <Table size="small"
          useFixedHeader
          className="table-column"
          rowClassName={this.getRowClassName}
          bordered dataSource={dataSource}
          columns={columns}
          scroll={{y: 200}}
          rowKey = {(record) => record.name } 
        />
      </div>
    )
  }
}
Method.propTypes = {
  /**
   * 包含组件method信息的**数组**
   */
  methods: PropTypes.array,
}
export default Method