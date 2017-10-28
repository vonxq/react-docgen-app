import React from 'react'
import { render } from 'react-dom'
import { markdown } from 'markdown'
import { Table, Tabs, Badge } from 'antd'
import PropTypes from 'prop-types'
import './table.css'
const TabPane = Tabs.TabPane
/**
 * 展示组件，接受一个props数组，解析并展示在table中
 */
class Props extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  handleFilter = (value, record) => {
    if(value === 'true') {
      return record.required
    }
    return !record.required
  }
  markdownToHtml = (sentence) => {
    const html = markdown.toHTML(sentence)
    return (<div dangerouslySetInnerHTML={{__html: html}}/>)
  }
  getRowClassName = (record, index) => {
    return index%2 === 0 ? 'single-row' : 'double-row'
  }
  render () {
    const { props } = this.props
    if (! props) {
      return <h3>no props</h3>
    }
    const keys = Object.keys(props)
    let dataSource = []
    for (let i in keys) {
      let { type, ...item } = props[keys[i]]
      item.type = type.name
      item.name = keys[i]
      dataSource.push(item)
    }
    const columns = [
      {
        title:  <span className="table-title">prop名</span>,
        dataIndex: 'name',
        key: 'name',
        width: '15%',
        sorter: (a, b) => a.name.localeCompare(b.name),
      },
      {
        title:  <span className="table-title">类型</span>,
        dataIndex: 'type',
        key: 'type',
        width: '10%',
        sorter: (a, b) => a.type.localeCompare(b.type),
      },
      {
        title:  <span className="table-title">required</span>,
        dataIndex: 'required',
        filters: [
          {text: 'required',
          value: true,},
          {text: 'not required',
          value: false,},
        ],
        onFilter: this.handleFilter ,
        key: 'required',
        render: (required) => (<Badge status={ required? "error" : "success" } text={required? "required" : "selectable" } />),
        width: '15%',        
      },
      {
        title:  <span className="table-title">说明</span>,
        dataIndex: 'description',
        key: 'description',
        width: '50%',  
        render: (text) => this.markdownToHtml(text) ,    
      },
    ]
    return (
      <div>
        <Table
          size="small"
          useFixedHeader 
          className="table-column"
          scroll={{y: 200}} 
          rowClassName={this.getRowClassName} 
          bordered dataSource={dataSource} 
          columns={columns} 
          rowKey = {(record) => record.name } />
      </div>
    )
  }
}
Props.propTypes = {
  /**
   * 包含组件props信息的**数组**
   */
  props: PropTypes.array,
}
export default Props
