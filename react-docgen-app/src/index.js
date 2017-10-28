import React from 'react'
import { render } from 'react-dom'
import { Input, Tooltip, Icon } from 'antd'
import './index.css'
import App from './app'
const InputSearch = Input.Search
// const dirpath = 'F:/github/reactdocs-demo/antdUp/src'
// const initDocPath = 'F:/github/reactdocs-demo/antdUp/src/Component/Counter.js'
/**
 * 容器组件，也是根组件。接受输入的文件夹地址并将其传给App组件处理
 */
class Root extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dirpath: ''
    }
  }
  handleSearch = (dirpath) => {
    console.log('search', dirpath)
    this.setState({dirpath})
  }
  render () {
    const { dirpath } = this.state
    return (
    <div className="app">
      <div className="head">
        <h1 style={{color: 'white', display: 'inline-block', marginRight: '10px'}}>React组件文档生成系统</h1>
       <InputSearch placeholder="请输入组件文件夹绝对路径" style={{ width: '200px'}} onSearch={this.handleSearch}/>
       <Tooltip title="在此输入组件文件夹绝对路径，enter即可。若成功，可在左边选择组件，右边可看到组件详细信息。注： stateless组件无法显示组件名" placement="right">
         <Icon type="question" className="question-icon"/>
        </Tooltip>
      </div>
      <App dirpath={dirpath} />
    </div>
    )
  }
} 
render(<Root />, document.getElementById("app"))
