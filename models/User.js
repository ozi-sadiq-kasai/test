const mongoose = require('mongoose')
const { googleClientID } = require('../config/keys')
const {Schema} = mongoose

const userScheama = new Schema({
    googleUserID: String,
    googleUserName: String,
})

mongoose.model('users',userScheama)