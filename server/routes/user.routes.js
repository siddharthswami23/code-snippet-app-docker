const express = require('express');
const { RegisterUser, GetUser, LoginUser } = require('../controllers/user.controller');
const UserRouter = express.Router();

UserRouter.post('/register', RegisterUser)
UserRouter.post('/login', LoginUser)
UserRouter.get('/get/:id', GetUser)

module.exports = UserRouter