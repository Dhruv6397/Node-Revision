const express = require('express')
const userRouter =require('./routes/user.js')
const {connectMongoDB} = require('./connection.js')
const {logReqRes} = require('./middlewares/index.js')
const app = express()
const PORT = 8000

//connection
connectMongoDB('mongodb://127.0.0.1:27017/youtube-app-1')

app.use(express.urlencoded({extended:false}))
app.use(logReqRes('log.tx'))
app.use('/api/users',userRouter)

app.listen(PORT,()=>{
    console.log("server started")
})