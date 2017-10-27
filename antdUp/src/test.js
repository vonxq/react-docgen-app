var fs = require("fs")
// "es2015", "react", "stage-0"
// var docgen = require('docgen-loader')
// var es = require('babel-preset-es2015')
// var react = require('babel-preset-react')
// var stage = require('babel-preset-stage-0')
// console.log(stage.presets[0])
// var ddd = require('!!docgen-loader!D:/code/github/reactdocs-demo/antdUp/src/Component/Counter.js')
// console.log(ddd)
// const path = 'D:/code/github/reactdocs-demo/antdUp/src/Component/Counter.js'
// const pa1 = require(stage.presets[0].presets[0](path))
// const pa2 = require(react.presets[0](path))
// const pa3 = require(es.presets[0](path))
// console.log(docgen(pa3))
// // var docs = require("!!docgen-loader!./Component/Counter");
// const src = "D:/code/github/reactdocs-demo/antdUp/src/Component"
function getName(path){
  return path.replace(/(.*\/)*([^.]+).*/ig,"$2")
}
function analysisFolder (path) {
  console.log(`查找${path}`)
  const result = {
    key: path,
    title: getName(path),
    children: [],
  }
  const files = fs.readdirSync(path)
  console.log('read', path)
  files.forEach( function (file){
    const filePath = path+'/'+file
    const stats = fs.statSync(path+'/'+file)
      console.log(path+'/'+file)          
      if(stats.isDirectory()) {
        result.children.push(analysisFolder(filePath))
      }
      // 判断文件是否为js文件，若是，则进行docgen操作
      else if (stats.isFile()){
        var re = /^.*?\.(js)$/
        if(file.match(re)) {
        console.log( path+'/'+file, 'match' );  
        result.children.push({
          title: file,
          key: path+'/'+file,
          docpath: path+'/'+file,
        })
      }
    }
  })
  return result
}




// file name :test.js
var express             = require('express');
var app                 = express();
var bodyParse           = require('body-parser')
var cookieParser        = require('cookie-parser') ;
app.use(cookieParser()) ;
app.use(bodyParse.urlencoded({extended:false})) ;

// 处理根目录的get请求
app.get('/',function(req,res){
    const path=req.query.path
    console.log(req.query)
     res.header("Access-Control-Allow-Origin", "*")
    console.log('getdoc', path)
        if (typeof path !== 'string')
    {
      res.status(200)
      return
    }
    const re = analysisFolder(path)
    // console.log(re)
    res.status(200)
    res.json({
      docs: re,
    })
    // res.sendfile('src/public/main.html') ;
    console.log('main page is required ');
}) ;

// 处理/login的get请求
app.get('/add', function (req,res) {
    res.sendfile('src/public/add.html') ;
    console.log('add page is required ') ;
}) ;
// app.get('/getdoc', function (req,res) {
//     const path=req.query.path
//     console.log('getdoc', path)
//      res.header("Access-Control-Allow-Origin", "*")
//     if (typeof path !== 'string')
//     {
//       res.status(200)
//       return
//     }
//     const re = analysisFolder(path)
//     res.status(200).json({
//       data: re,
//     })
//     // res.sendfile('src/public/add.html') ;
//     // console.log('add page is required ') ;
// }) ;

// 处理/login的post请求
app.post('/login',function(req,res){
    // console.log(req)
    name=req.body.name ;
    pwd=req.body.pwd   ;
    console.log(name+'--'+pwd) ;
    res.status(200).send(name+'--'+pwd) ;
});

// 监听3000端口
var server=app.listen(3000) ;