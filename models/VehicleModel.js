import mongoose from "mongoose";

const  schema = new mongoose.Schema({
    userId : {type:String , required:true , trim:true},
    name: {type:String , required:true , trim:true},
    department: {type:String , required:true , trim:true},
    type: {type:String , required:true , trim:true},
    rate: {type:String , required:true , trim:true},
    date: {type:String , required:true , trim:true},
    destination: {type:String , required:true , trim:true},
    pickup: {type:String , required:true , trim:true},
    reason: {type:String , required:true , trim:true},
    email: {type:String , required:true , trim:true},
    mobile: {type:String , required:true , trim:true},
});

const VehicleModel = mongoose.model('vehile' , schema);

export default VehicleModel;