const http = require('http')
const fs = require('fs')
const url = require('url')
// const myServer = http.createServer((req,res)=>{
//     console.log("this is req"+req)
//     res.end("this is response"+res+" Req:"+req)
// })

const myServer = http.createServer((req,res)=>{
    if(req.url === '/favicon.ico') return res.end()
    const log = `${Date.now()}:${req.url} :${req.method}: New req received\n`
    const myUrl = url.parse(req.url,true)
    console.log(myUrl)
    fs.appendFile("log.txt",log,(err,data)=>{
        switch(myUrl.pathname){
            case '/':res.end("this is home page")
            break;
            case '/about':
                const username = myUrl.query.name
                res.end(`I m ${username}`)
            break;
            case '/contact':res.end("this is contact page")
            break;
            default:res.end("404")
        }
    })
})
myServer.listen(8000,()=>console.log("Hello from server"))
