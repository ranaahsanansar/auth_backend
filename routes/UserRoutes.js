import express from 'express';
const UserRoutes = express.Router();
import UserController from '../controllers/UserController.js';
import userAuthentication from '../middlewares/AuthMiddleware.js';

UserRoutes.use('/changepass' , userAuthentication);


// UnAuthorized Routes 

UserRoutes.post('/register' , UserController.userRegistration);
UserRoutes.post('/login' , UserController.userLogin);

// Authenticated Routes 

UserRoutes.post('/changepass' , UserController.changUserPass);


export default UserRoutes;