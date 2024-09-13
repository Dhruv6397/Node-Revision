const express = require('express')
const {handleGetAllUsers,
    handleGetUserById,
    handleUpdateUser,
    handleDeleteUser,
    handleAddUser} = require('../controllers/user')
const router = express.Router()


router.route('/')
.get(handleGetAllUsers)
.post(handleAddUser)
//dynamic route where id is dynamic
router.route('/:id').get(handleGetUserById)
.patch(handleUpdateUser)
.delete(handleDeleteUser)


module.exports = router
