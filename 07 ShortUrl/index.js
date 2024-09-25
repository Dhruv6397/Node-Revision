const express = require('express')
const cookieParser = require('cookie-parser')
const path = require('path')
const {connectToMongoDB} = require('./connect')
const {restrictToLoggedInUserOnly,checkAuth} = require('./middleware/auth.js')

const URL = require('./models/url.js')

const urlRoute = require('./routes/url')
const userRoute = require('./routes/user.js')
const staticRouter = require('./routes/staticRouter.js')


const app = express()
const PORT = 8001

connectToMongoDB('mongodb://127.0.0.1:27017/short-url')
.then(()=>console.log("mongoDB connected"))
app.set("view engine","ejs")
app.set('views',path.resolve('./views'))

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())



app.use('/url',restrictToLoggedInUserOnly,urlRoute) 
app.use('/',checkAuth,staticRouter)
app.use('/user',userRoute)


app.get('/url/:shortId',async(req,res)=>{
    const shortId = req.params.shortId;  
    const entry = await URL.findOneAndUpdate(
        { shortId },
        { $push: { visitHistory: { timestamp: Date.now() } } },
        { new: true }
    );    
    if (!entry) {
        return res.status(404).json({ error: "Short URL not found" });
    }
    res.redirect(entry.redirectURL);})

app.listen(PORT,()=>{console.log("server started at 8001")})