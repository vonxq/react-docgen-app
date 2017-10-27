import React from 'react'
import { render } from 'react-dom'
import { Table, Tabs, Badge } from 'antd'
const TabPane = Tabs.TabPane
class Doc extends React.Component {
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
  render () {
    const { props } = this.props
    const keys = Object.keys(props)// 多个prop
    // for (let i in keys) {
    //   const { description, required, type } = keys[i]// type是个对象，如: { name: number }
    // }
    let dataSource = []
    for (let i in keys) {
      // let item = { name: key[i] }
      let { type, ...item } = props[keys[i]]// type是个对象，如: { name: number }
      item.type = type[keys[i]]
      item.name = keys[i]
      dataSource.push(item)
      // const { description, required, type } = props[keys[i]]// type是个对象，如: { name: number }
    }
    const columns = [
      {
        title: "prop名",
        dataIndex: 'name',
        key: 'name',
        width: '15%',
        filters: [
          {text: 'required',
          value: true,},
          {text: 'not required',
          value: false,},
        ],
        onFilter: this.handleFilter ,
        sorter: (a, b) => a.name > b.name,
      },
      {
        title: 'required',
        dataIndex: 'required',
        key: 'required',
        render: (required) => (<Badge status={ required? "error" : "success" } text={required? "required" : "selectable" } />),
        width: '15%',        
      },
      {
        title: '说明',
        dataIndex: 'description',
        key: 'description',
        width: '50%',        
      },
      {
        title: 'type',
        dataIndex: 'type',
        key: 'type',
        width: '10%',        
      },
    ]
    return (
      <div>
        <Table size="small" bordered dataSource={dataSource} columns={columns} rowKey = {(record) => record.name } />
      </div>
    )
  }
}
export default Doc
