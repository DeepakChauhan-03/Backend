const mongoose = require('mongoose')


//For blacklisting the token
const blacklistTokenSchema = new mongoose.Schema({
    token:{
        type:String,
        required:[true , "Token is required to add in blacklist"]
    }
},{
    timestamps:true
})

const tokenBlacklistModel = mongoose.model("blacklistTokens",blacklistTokenSchema)

module.exports = tokenBlacklistModel