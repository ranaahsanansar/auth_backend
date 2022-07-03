import UserModel from "../models/UserModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class UserController {
    // User Singup Functionality -------------------------------------------
    static userRegistration = async (req, res) => {
        const { name, email, password, password_confirmation, tc } = req.body;
        const user = await UserModel.findOne({ email: email });
        if (user) {
            res.send({ "status": "failed", "message": "Email Already Exists!" });
        } else {
            if (name && email && password && password_confirmation && tc) {
                if (password === password_confirmation) {
                    try {
                        // Password hashing 
                        const salt = await bcrypt.genSalt(10);
                        const hashPassword = await bcrypt.hash(password, salt);
                        // Get Data into an Object 
                        const doc = new UserModel({
                            name: name,
                            email: email,
                            password: hashPassword,
                            tc: tc
                        });
                        // Saving Data into DataBase 
                        await doc.save();
                        res.status(201).send({ "status": "success", "message": "Registerd Successfull" });
                    } catch (error) {
                        res.send({ "status": "failed", "message": "Not save DataBase Error!" });
                    }
                } else {
                    res.send({ "status": "failed", "message": "Password Not Matched!" });
                }
            } else {
                res.send({ "status": "failed", "message": "All fields are required!" });
            }
        }
    }

    // User Login Functionlity 
    
}

export default UserController;