import express from 'express';
const UserRoutes = express.Router();
import UserController from '../controllers/UserController.js';

// UnAuthorized Routes 

UserRoutes.post('/register' , UserController.userRegistration);
UserRoutes.post('/login' , UserController.userLogin);

// Authenticated Routes 


export default UserRoutes;