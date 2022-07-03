import dotenv from "dotenv";
dotenv.config();
import express from 'express';
import cors from 'cors';
import connectDb from './config/connectdb.js';
import UserRoutes from "./routes/UserRoutes.js";

const app = express();
const port = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL;

// cors policy 
app.use(cors()); 

// DataBase Connection 
connectDb(DATABASE_URL);

// JSON API use 
app.use(express.json());


// Load Routes 
app.use('/api/user' , UserRoutes);



app.listen(port , ()=>{
    console.log('Server listening');
});
