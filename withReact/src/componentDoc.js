import React from 'react'
import { render } from 'react-dom'
import { Table, Tabs } from 'antd'
import Counter from './Component/Counter'
const TabPane = Tabs.TabPane
class Doc extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  render () {
    return (
      <div>
        <Tabs>
          <TabPane key="props" >props</TabPane>
          <TabPane key="method">method</TabPane>
        </Tabs>
      </div>
    )
  }
}
export default Doc
