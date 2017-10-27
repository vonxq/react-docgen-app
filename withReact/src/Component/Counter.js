import React from 'react'
import PropTypes from 'prop-types'
class Counter extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      counter: 0,
    }
  }
  add = () => {
    let { counter } = this.state
    counter++
    this.setState({ counter })
  }
  dec = () => {
    let { counter } = this.state
    counter--
    this.setState({ counter })
  }
  rst = () => {
    this.setState({ counter: 0 })
  }
  render () {
    return (
      <div>
        当前计数值: {this.state.counter}
        <button onClick={this.add} style={{marginLeft: '10px'}}>+</button>
        <button onClick={this.dec} style={{marginLeft: '10px'}}>-</button>
        <button onClick={this.rst} style={{marginLeft: '10px'}}>reset</button>
      </div>
    )
  }
}
Counter.propTypes = {
  /**
  必须是个名字，007
  */
  name: PropTypes.number.isRequired,
}
export default Counter