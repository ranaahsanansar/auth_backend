import express from 'express';
const VehicleRoutes = express.Router();
import userAuthentication from '../middlewares/AuthMiddleware.js';
import VehicleController from '../controllers/VehicleController.js';

VehicleRoutes.use('/add' , userAuthentication);

// UnAuthorized Routes 
VehicleRoutes.post('/add' , VehicleController.addVehicle);
VehicleRoutes.get('/get' , VehicleController.getAll);
VehicleRoutes.get('/get-by-id/:id' , VehicleController.getVehicleById);


VehicleRoutes.post('/send-message' , VehicleController.sendMessage);
VehicleRoutes.get('/get-all-messages' , VehicleController.getAllMessages);
VehicleRoutes.get('/get-message-by-id/:id' , VehicleController.getMessagById);



export default VehicleRoutes;