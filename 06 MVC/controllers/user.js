const User = require('../models/user.js')
async function handleGetAllUsers(req,res){
    const allDbUsers = await User.find({}) 
    return res.json(allDbUsers) 
}

async function handleGetUserById(req,res){
    const user = await User.findById(req.params.id)
    if(!user) return res.status(404)
    return res.json(user)
}

async function handleUpdateUser(req,res){
    await User.findByIdAndUpdate(req.params.id,{last_name:"changed"})
    return res.json({status:"success"})
}

async function handleDeleteUser(req,res){
    await User.findByIdAndDelete(req.params.id)
    return res.status(200).json({status:"success"})
}

async function handleAddUser(req,res){
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

    const result = await User.create({
        first_name:body.first_name,
        last_name:body.last_name,
        email:body.email,
        gender:body.gender,
        jobTitle:body.jobTitle
    })
    console.log(result)
    return res.status(201).json({msg:"success"})
}

module.exports={
    handleGetAllUsers,
    handleGetUserById,
    handleUpdateUser,
    handleDeleteUser,
    handleAddUser
}