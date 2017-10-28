import React from 'react'
import PropTypes from 'prop-types'
import { render } from 'react-dom'
import { Col, Row } from 'antd'
import Doc from './components/doc'
import DirTree from './components/dirTree'
import './index.css'
/**
 * 容器组件，中转站，接受一个文件夹地址并将其交由DirTree展示文档树
 * 将DirTree中的点击回调传给Doc组件解析展示该组件详细信息
 */
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      docpath: '',
      dirpath: '',
    }
  }
  handleTreeSelect = (docpath) => {
    this.setState({ docpath })
  }
  componentWillReceiveProps (nextProps) {
    const { dirpath } = nextProps
    if(dirpath){
        this.setState({dirpath})
    }
  }
  render () {
    const { docpath, dirpath } = this.state
    return (
    <div>
      <Row gutter={16}>
        <Col span={5}><DirTree dirpath={dirpath} onSelect={this.handleTreeSelect}/></Col>
        <Col span={18}>
            <Doc docpath={docpath} />
        </Col>
      </Row>
    </div>
    )
  }
} 
App.propTypes = {
    /**
     * 要解析的文件夹路径，**绝对路径**
     */
    dirpath: PropTypes.string.isRequired,
  }
export default App