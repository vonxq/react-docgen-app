# 为react component生成相应文档  
## 使用
克隆程序，然后执行:
```
cd ./withWebpack
yarn
npm run dev
打开http://localhost:8080/即可查看
# 项目打包
npm run build
```
## 原理解析
react-docgen src/Counter.js -o test.json --pretty
docgen-loader: 一个生成component json文档的小api，调用react-docgen
使用: var docs = require("!!docgen-loader!./Counter.js");
[docgen-loader源码(36行)](https://github.com/eisisig/docgen-loader/blob/master/index.js)
## 使用范围
class、无状态组件可成功生成json数据数组，只有console.log时生成一个奇怪的object

## 更新日志
10.24 加入babel-preset-stage-0,在class中使用箭头函数报unexpected token错误