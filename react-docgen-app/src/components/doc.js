import React from 'react'
import { render } from 'react-dom'
import { Table, Tabs, Card } from 'antd'
import Props from './props'
import Method from './method'
import axios from 'axios'
import { markdown } from 'markdown'
import PropTypes from 'prop-types'
import DocCard from './card/card'
const TabPane = Tabs.TabPane
/**
 * 容器组件，根据props的docpath获取组件信息，并交由card组件、method组件、props组件展示
 * 使用card组件来装数据
 */
class Doc extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      docs: [],
    }
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.docpath) {
      this.getContents(nextProps.docpath)
    }
  }
  getContents = (docpath) => {
    axios.get('http://127.0.0.1:3000/docs', {
      params:{
      path: docpath}
    })
    .then( (response) => {
      let docs = []
      console.log('doc信息', docs)
      docs.push(response.data.docs)
      this.setState({docs})
    })
    .catch(function (error) {
      console.log("axios error", error)
    })
  }
  markdownToHtml = (sentence) => {
    const html = markdown.toHTML(sentence)
    return (<div dangerouslySetInnerHTML={{__html: html}}/>)
  }
  render () {
    const content = this.state.docs && this.state.docs[0] ? this.state.docs[0] : {}
    let { description, displayName, methods, props  } = content
    const { docpath } = this.props
    const docCardProps = {
      title: displayName ? `${displayName}组件`: '我本该是组件名的',
      description: description ? this.markdownToHtml(description) : '',
      address: docpath || '',
      content: (
        <Tabs defaultActiveKey="1">
          <TabPane tab="props" key="1"> <Props props={props || [] } /></TabPane>
          <TabPane tab="method" key="2"><Method methods={methods || []}/></TabPane>
        </Tabs>
      )
    }
    return (
      <div className="doc-root">
        <DocCard 
          {...docCardProps}
        />
      </div>
    )
  }
}
Doc.propTypes = {

}
export default Doc
