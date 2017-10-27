import React from 'react'
import { render } from 'react-dom'
import { Table, Tabs, Card } from 'antd'
import Props from './props'
import Method from './method'
import docgen from 'docgen-loader'
// import babelLoader from 'babel'
var reactDocs = require('react-docgen');
const TabPane = Tabs.TabPane
class Doc extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  componentWillReceiveProps = (nextProps) => {
    if (nextProps.docpath) {
      this.getContents(nextProps.docpath)
    }
  }
  
  getContents = (docpath) => {
    // console.log('docs解析info',docpath)
    // const text = import('D:/code/github/reactdocs-demo/antdUp/src/Component/Counter.js')
    // var componentInfo = reactDocs.parse();

    // console.log('docs解析info',componentInfo)
    // console.log('docs解析',docpath)
    // // const docs = require(`!!docgen-loader!${docpath}`);
    const path = "!!docgen-loader!"+docpath
    console.log('docs解析值path',docpath)
    const docs = require('docgen-loader!babel-loader!'+ docpath)
    // const docs = require('!!docgen-loader!D:/code/ICG_v9_0_0_GUI_test_Branch/gui/html/frontend/src/routes/network/dhcp/index.js')
    this.setState({docs})
    // const docs = docgen(path)
    console.log('docs解析值',docs) 
  }
  render () {
    if (!this.state.docs) {
      return <div>13241434</div> 
    }
    const content = this.state.docs[0]
    // const { content } = this.props
    // 取出设置项
    const { description, displayName, methods, props  } = content
    // 方法项
    const { docblock, modifiers, params, returns } = methods[0]// 数组有很多项
    // 
    const { name } = modifiers
    const keys = Object.keys(props)// 多个prop
    for (let i in keys) {
      const { description, required, type } = keys[i]// type是个对象，如: { name: number }
    }
    console.log('con', content)
    return (
      <Card title={`${displayName}组件说明`}>
        <div>{description}</div>
        <Tabs defaultActiveKey="1">
          <TabPane tab="props" key="1"><Props props={props} /></TabPane>
          <TabPane tab="method" key="2"><Method methods={methods}/></TabPane>
        </Tabs>
      </Card>
    )
  }
}
export default Doc
