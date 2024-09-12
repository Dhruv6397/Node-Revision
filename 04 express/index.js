//const http = require('http')
const express = require('express')
const app = express()

app.get('/',(req,res)=>{
    return res.send("This is home page")
})

app.get('/about',(req,res)=>{
    return res.send(`Hello ${req.query.name} my age is ${req.query.age}`)
})

app.listen(8000,()=>console.log("server started baby"))

//following http also does not need with express but if you want to use then you can
// const myServer = http.createServer(app)
// myServer.listen(8000,()=>console.log("server started"))