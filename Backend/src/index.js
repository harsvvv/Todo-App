import dotenv from "dotenv";
dotenv.config({
    path:'./env'
})
import {connect} from '../db/index.js';
import {app} from './App.js'


connect()
.then(()=>{
    app.listen(process.env.PORT || 5000 ,()=>{
        console.log(`app is listening of port ${process.env.PORT}`)
        
    })
}).catch((err)=>{
    console.log("error on connection",err);
});