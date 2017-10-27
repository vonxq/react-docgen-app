import React from 'react'
import { render } from 'react-dom'
import { Col, Row } from 'antd'
import Doc from './docs/componentDoc'
import Tree from './tree'
import './index.css'
import axios from 'axios'
// import anslysis from './test'
// var doc = require("!!docgen-loader!D:/code/github/reactdocs-demo/antdUp/src/Component/test/Counter.js");
// // var docs = anslysis("D:/code/ICG_v9_0_0_GUI_test_Branch/gui/html/frontend/src/routes");
// console.log('tetettete', doc)
class Ha extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      docs: [],
      docpath: 'D:/code/github/reactdocs-demo/antdUp/src/Component/Counter.js',
    }
  }
  
  componentDidMount() {
    this.fetchData()
  }
  fetchData = () => {
    axios.get('http://127.0.0.1:3000', {
      params:{
      path: 'D:/code/ICG_v9_0_0_GUI_test_Branch/gui/html/frontend/src/routes'}
    })
    .then( (response) => {
      let docs = []
      docs.push(response.data.docs)
      this.setState({docs})
      console.log("axios收到的docs", docs)
    })
    .catch(function (error) {
      console.log("axios error", error)
    })
  }
  handleTreeSelect = (docpath) => {
    this.setState({ docpath })
  }
  render () {
    // console.log(docs)
    const { docs, docpath } = this.state
    return (
    <div className="app">
      <Row gutter={32}>
        <Col span={8} offset={4}><Tree gData={docs} onSelect={this.handleTreeSelect}/></Col>
        <Col span={8}>
            <Doc docpath={docpath} />
        </Col>
      </Row>
    </div>
    )
  }
} 
render(<Ha />, document.getElementById("app"))
