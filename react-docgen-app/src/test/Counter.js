import React from 'react'
import PropTypes from 'prop-types'
/**
 * 这是一个实现简单counter的函数,作为测试，未在项目中用到
 */
class Counter extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      counter: 0,
    }
  }
  /**
   * 加法操作
   * params: add
  */
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
  必须是个名字，007sd君不见，黄河之水天上来⑵，奔流到海不复回。
君不见，高堂明镜悲白发，朝如青丝暮成雪⑶。
人生得意须尽欢⑷，莫使金樽空对月。
天生我材必有用，千金散尽还复来。
烹羊宰牛且为乐，会须一饮三百杯⑸。
岑夫子，丹丘生⑹，将进酒，杯莫停⑺。
与君歌一曲⑻，请君为我倾耳听⑼。
钟鼓馔玉不足贵⑽，但愿长醉不复醒⑾。
古来圣贤皆寂寞，惟有饮者留其名。
陈王昔时宴平乐，斗酒十千恣欢谑⑿。
主人何为言少钱⒀，径须沽取对君酌⒁。
五花马⒂，千金裘，呼儿将出换美酒，与尔同销万古愁⒃。[1] 
  */
  name: PropTypes.number.isRequired,
  /**
   * hahahah
  */
  hahah: PropTypes.string,
  /**
   * hah1231314
  */
  ka: PropTypes.string,
}
export default Counter