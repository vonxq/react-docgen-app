import React from 'react'
import { render } from 'react-dom'
// import Counter from './Component/Counter'
import Doc from './componentDoc'
import './index.css'
// import reactDocs from 'react-docgen'
// let componentInfo = reactDocs.parse(src)
// var reactDocs = require('react-docgen');
// var componentInfo = reactDocs.parse(Counter);
var docs = require("!!docgen-loader!./Component/Counter");
const Ha = () => {
  console.log(docs)
  return (
    <div>
      <Doc />
    </div>)
}
render(<Ha />, document.getElementById("app"))
