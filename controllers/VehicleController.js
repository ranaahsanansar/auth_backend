import MessageModel from "../models/MessageModel.js";
import VehicleModel from "../models/VehicleModel.js";

export default class VehicleController {
    static addVehicle = async (req, res) => {
        try {
            const { name, department, type, rate, date, destination, pickup, reason, email, mobile } = req.body;

            console.log(name)


            const userID = req.user._id;

            const doc = new VehicleModel({
                userId: userID,
                name: name,
                department: department,
                type: type,
                rate: rate,
                date: date,
                destination: destination,
                pickup: pickup,
                reason: reason,
                email: email,
                mobile: mobile,
            })

            const savedVehicle = await doc.save()
            res.send({ "status": "success", "message": "Vehicle is Added" });

        } catch (err) {
            res.send({ "status": "failed", "message": "Error in Storing Data" });
        }
    }

    static getAll = async (req, res,) => {
        try {
            const result = await VehicleModel.find();
            if (result) {
                res.send(result);
            } else {
                res.send({ "status": "failed", "message": "Nothing Found" });
            }

        } catch (err) {
            res.send({ "status": "failed", "message": "Error in Fetching Data" });
        }
    }

    static getVehicleById = async (req ,res)=>{
        try{
            const { id } = req.params
            const result = await VehicleModel.findById(id);
            if(result){
                res.send(result);
            }else{
                res.send({ "status": "failed", "message": "Nothing Found" });
            }
            
        }catch(err){
            res.send({ "status": "failed", "message": "Error in Fetching Data" });
        }
    }

    static sendMessage = async (req, res) => {
        try {
            const { name, email, message } = req.body;

            const doc = new MessageModel({
                name: name,
                email: email,
                message: message
            })

            const saved = await doc.save();
            res.send({ "status": "success", "message": "Message is send to Authority" });
        } catch (err) {
            res.send({ "status": "failed", "message": "Error in Storing Data" });
        }
    }

    static getAllMessages = async (req , res) => {
        try{
            const result = await MessageModel.find()
            if(result){
                res.send(result);
            }else{
                res.send({ "status": "failed", "message": "Nothing Found" });
            }
            
        }catch(err){
            res.send({ "status": "failed", "message": "Error in Storing Data" });
        }
    }

    static getMessagById = async (req , res) => {
        try{
            const { id } = req.params;
            const result = await MessageModel.findById(id)
            if(result){
                res.send(result);
            }else{
                res.send({ "status": "failed", "message": "Not Found" });
            }
            
        }catch(err){
            res.send({ "status": "failed", "message": "Error in communicating with database" });
        }
    }
}