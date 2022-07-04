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
                        // JWT Tokenization 
                        const saved_user = await UserModel.findOne({ email: email });
                        // Gentrating JWT Token 
                        const token = jwt.sign({ userID: saved_user._id }, process.env.JWT_KEY, { expiresIn: '5d' });

                        res.status(201).send({ "status": "success", "message": "Registerd Successfull", "token": token });
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
    static userLogin = async (req, res) => {
        try {
            const { email, password } = req.body;
            if (email && password) {
                const user = await UserModel.findOne({ email: email });
                if (user != null) {
                    const isMatch = await bcrypt.compare(password, user.password);
                    if (user.email === email && isMatch) {
                        const token = jwt.sign({ userID: user }, process.env.JWT_KEY, { expiresIn: '5d' });

                        res.status(201).send({ "status": "success", "message": "User Login Succes!", "token": token });

                    } else {
                        res.send({ "status": "failed", "message": "Incorrect Password!" });
                    }
                } else {
                    res.send({ "status": "failed", "message": "User not Found. Incorrect Email!" });
                }
            } else {
                res.send({ "status": "failed", "message": "All fields are required!" });
            }
        } catch (error) {
            console.log(error);
            res.send({ "status": "failed", "message": "Unable to GetResponse from DataBase" });
        }
    }

    static changUserPass = async (req, res) => {
        const { password, password_confirmation } = req.body;
        if (password && password_confirmation) {
            if (password === password_confirmation) {
                const salt = await bcrypt.genSalt(10);
                const newHashPassword = await bcrypt.hash(password, salt);
                await UserModel.findByIdAndUpdate(req.user._id, { $set: { password: newHashPassword } });
                res.send({ "status": "Success", "message": "Password was Changed Succesfully !" })
            } else {
                res.send({ "status": "failed", "message": "Confirmed Password Not Matched!" });
            }
        } else {
            res.send({ "status": "failed", "message": "All fields are required!" });
        }


    }


    static loggedUser = async (req, res) => {
        res.send({ "user": req.user });
    }

    static sendResetPasswordEmail = async (req, res) => {
        const { email } = req.body;
        if (email) {
            const user = await UserModel.findOne({ email: email });


            if (user) {
                const Key = user._id + process.env.JWT_KEY;
                const emailToken = jwt.sign({ userID: user._id }, Key, { expiresIn: '15m' });
                const link = `http://127.0.0.1:3000/api/user/reset/${user._id}/${emailToken}`;
                console.log(link);
                res.send({ "status": "success", "message": "Your reset link is send to your email please verify with in 15 mintues!" });
            } else {
                res.send({ "status": "failed", "message": "Email does not Exists!" });
            }

        } else {
            res.send({ "status": "failed", "message": "Email fields is required!" });
        }
    }

    static forgottenPasswordReset = async (req, res) => {
        const { password, password_confirmation } = req.body
        const { id, token } = req.params
        const user = await UserModel.findById(id);
        const new_Key = user._id + process.env.JWT_KEY;
        try {
            jwt.verify(token, new_Key);
            
            if (password && password_confirmation) {
                if (password === password_confirmation) {
                    const salt = await bcrypt.genSalt(10);
                    console.log("1");
                    const resetHashPassword = await bcrypt.hash(password, salt);
                    console.log("2");
                    await UserModel.findByIdAndUpdate(id, { $set: { password: resetHashPassword } });
                    console.log("3");
                    res.send({ "status": "success", "message": "Password Reset Success!" });
                } else {
                    res.send({ "status": "failed", "message": "Password Not matched!" });
                }
            } else {
                res.send({ "status": "failed", "message": "All fields are required!" });
            }
        } catch (error) {
            res.send({ "status": "failed", "message": "Invalid Token!" });
        }
    }

}

export default UserController;