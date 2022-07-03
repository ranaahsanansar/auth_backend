import express from 'express';
const UserRoutes = express.Router();
import UserController from '../controllers/UserController.js';

// UnAuthorized Routes 

UserRoutes.post('/register' , UserController.userRegistration);

// Authenticated Routes 


export default UserRoutes;