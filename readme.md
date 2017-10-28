# 为react component生成相应文档    
系统组件写多了很容易弄混  
这个库可以为任意文件夹下的组件生成相关文档  

具体功能如下:  
1. 根据输入文件夹解析出组件文档  
2. 点击左边文档树内容实现组件文档的查看  
注意： **无状态组件无法获取显示组件名**  
效果图:
![img](https://github.com/vonxq/react-docgen-app/blob/master/img/app.png?raw=true)

## 使用范围  
可以解析js or jsx 文件中写的组件    
## 使用方法  
克隆程序，然后执行:  
```  
cd ./antdUp  
yarn  
npm run dev & npm run server  
打开http://localhost:8080/即可查看 
在页面输入自己想要解析的文件夹绝对路径即可   
```  

## 为自己的组件写注释文档  
props和method的说明字段支持markdown语法 
prop的解析依赖于对组件propTypes的定义  
注释均需要写在想要注释字段的上一行(支持组件、方法、prop的说明，可识别markdown)
示例要用在/***/中写  
以下是一个简单示例
```javascript
import React from 'react'
import PropTypes from 'prop-types'
/**
 * 这是一个test组件
 */
class Test extends React.Component {
  state = {
  }
  /**
   * 用于从服务器获取文件夹信息，之后将信息可提供给SearchTree渲染
   */
  fetchInfosByDir = (dir) => {
  }
  render() {
    return (
      <div>
      </div>
    );
  }
}
Test.propTypes = {
  /**
   * 要解析的文件夹路径，必须是**绝对路径**
   */
  dirpath: PropTypes.string.isRequired,
  /**
   * 当选中一个js组件文件时的回调函数，(docpath)=>{}
   */
  onSelect: PropTypes.func.isRequired,
}
export default Test

```

## 原理解析  
1. 系统用[react-docgen](https://github.com/reactjs/react-docgen)分析文档信息并解析json数据展示在界面上      
react-docgen src/Counter.js -o test.json --pretty  
```javascript    
const docgen = require('react-docgen');  
docs = docgen   .parse(fs.readFileSync(path))  
```  
2. 前端主要实现数据的获取与展示  
3. 后台是node.js写的一个服务，作用如下:  
    1. 分析文件夹内容  
    2. 根据组件path返回组件信息  
  
## 后记  
编写组件一定要做到容器组件和展示组件相分离，否则想要改样式或者加逻辑会是相当痛苦的事情
容器组件用于获取数据，展示组件用于展示数据

