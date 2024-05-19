import express from 'express';
import {router} from '../routes/UserRouter.route.js'
import cors from 'cors'


const app=express();
app.use(express.json({limit:"16kb"}));
//setting of body parser
app.use(cors());


app.use("/api/v1/users",router);


export {app};