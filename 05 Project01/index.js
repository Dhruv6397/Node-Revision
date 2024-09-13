const express = require('express')
const users = require("./MOCK_DATA.json")
const fs = require("fs")
const app = express()
const PORT = 8000
const mongoose = require('mongoose')


//schema
const userSchema = new mongoose.Schema({
    first_name:{
        type:String,
        required:true
    },last_name:{
        type:String
    },email:{
        type:String,
        required:true,
        unique:true
    },jobTitle:{
        type:String
    },gender:{
        type:String
    }
},{timestamps:true}) 
const User = mongoose.model('user',userSchema)
//connection
mongoose.connect('mongodb://127.0.0.1:27017/youtube-app-1')
.then(()=>console.log("mongo connected"))
.catch((Err)=>console.log(Err))
// create model


app.use(express.urlencoded({extended:false}))
app.use((req,res,next)=>{
    console.log("hello from middleware 01")
    //req.myUserName = "Breek"
    res.setHeader("X-position","stand")
    next()
})

app.use((req,res,next)=>{
    console.log("hello from middleware 02")
    //return res.end("hey from middleware 02")
    next()
})


//routes
app.get('/',(req,res)=>{
    return res.send("<h1>This is home page</h1>")
})


app.get('/users',async(req,res)=>{
    const allUsers = await User.find({})
    const html = `
    <ul>
        ${allUsers.map((user)=>`<li>${user.first_name} Email: ${user.email}</li>`)}
    </ul>
    `
    return res.send(html)
})


app.get('/api/users',async(req,res)=>{
    const allDbUsers = await User.find({}) 
    return res.json(allDbUsers) 
})

//dynamic route where id is dynamic
app.route('/api/users/:id').get( async (req,res)=>{
    const user = await User.findById(req.params.id)
    if(!user) return res.status(404)
    return res.json(user)
})
.patch(async(req,res)=>{
    await User.findByIdAndUpdate(req.params.id,{last_name:"changed"})
    return res.json({status:"success"})
})
.delete(async(req,res)=>{
    await User.findByIdAndDelete(req.params.id)
    return res.status(200).json({status:"success"})
})

app.post("/api/users", async (req,res)=>{
    const body = req.body
    if(
        !body||
        !body.first_name||
        !body.last_name ||
        !body.email ||
        !body.gender ||
        !body.jobTitle
    ){
        return res.status(404).json({msg:"all fields required."})
    }
    // users.push({...body,id:users.length+1})
    // fs.writeFile('./MOCK_DATA.json',JSON.stringify(users),(err,data)=>{
    //     if(err){
    //         return res.status(500).json({status:"error",message:"failed to update"})
    //     }
    // })
    // console.log(body)
    // return res.json({status:"success"})

    const result = await User.create({
        first_name:body.first_name,
        last_name:body.last_name,
        email:body.email,
        gender:body.gender,
        jobTitle:body.jobTitle
    })
    console.log(result)
    return res.status(201).json({msg:"success"})
})


app.listen(PORT,()=>{
    console.log("server started")
})