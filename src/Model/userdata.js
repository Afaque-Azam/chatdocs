import mongoose from "mongoose";
const Schema = mongoose.Schema({
    userid:{
        type:String,
        required:true,
    },
    chatname:{
        type:String,
        required:true,
    },
})
export const UserData = mongoose.models.UserData || mongoose.model('UserData', Schema);