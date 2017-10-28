var fs = require("fs")
const docgen = require('react-docgen');
function getName(path){
  return path.replace(/(.*\/)*([^.]+).*/ig,"$2")
}
// 将一个文件夹解析成一个树状结构，只保留组件信息
function analysisFolder (path) {
  if( !fs.existsSync(path)) {
    return {
      error: '此文件夹不存在!!! '
    }
  }
  const s =fs.statSync(path)
  if(!s.isDirectory()){
    return {
      error: '输入不是文件夹!!!'
    }
  }
  const result = {
    key: path,
    title: getName(path),
    children: [],
  }
  const files = fs.readdirSync(path)
  files.forEach( function (file){
    const filePath = path+'/'+file
    const stats = fs.statSync(path+'/'+file)
    if(stats.isDirectory()) {
      const tmp = analysisFolder(filePath)
      if(tmp.children.length >= 1)
        result.children.push(tmp)
    }
    // 判断文件是否为js文件，若是，则进行docgen操作
    else if (stats.isFile()){
      var re = /^.*?\.(js)x?$/
      if(file.match(re)) {
      // console.log( path+'/'+file, 'match' );  
      // 判断是否含有组件
      try {
        let re = docgen.parse(fs.readFileSync(path+'/'+file))
        result.children.push({
          title: file,
          key: path+'/'+file,
          docpath: path+'/'+file,
        })
      } catch (error) {
        // console.log(path+'/'+file+'不是一个组件文件')
      }
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
    res.header("Access-Control-Allow-Origin", "*")
    if (typeof path !== 'string')
    {
      res.status(200)
      return
    }
    const re = analysisFolder(path)
    res.status(200)
    res.json({
      infos: re,
    })
})
// 处理根目录的get docs请求
app.get('/docs',function(req,res){
    const path=req.query.path
    console.log("获取组件doc", path)
    res.header("Access-Control-Allow-Origin", "*")
    if (typeof path !== 'string'){
      res.status(200)
      return
    }
    let re
    try {
      re = docgen.parse(fs.readFileSync(path))
    } catch (error) {
      re = {}
    } 
    res.status(200)
    res.json({
      docs: re,
    })
    // res.sendfile('src/public/main.html') ;
})

// 处理/login的post请求
app.post('/login',function(req,res){
    name=req.body.name ;
    pwd=req.body.pwd   ;
    res.status(200).send(name+'--'+pwd) ;
});

// 监听3000端口
var server=app.listen(3000) ;