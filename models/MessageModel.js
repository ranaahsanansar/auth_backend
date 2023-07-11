import mongoose from "mongoose";


const  schema = new mongoose.Schema({
    name: {type:String , required:true , trim:true},
    email: {type:String , required:true , trim:true},
    message: {type:String , required:true , trim:true},
});

const MessageModel = mongoose.model('message' , schema);

export default MessageModel;