import mongoose from 'mongoose';
import { db_name } from '../src/constant.js';

const connect=async()=>{
    const db_url=process.env.DB_CONNECTION_SECOND;
    try {
        await mongoose.connect(`${db_url}/${db_name}`);
        console.log("database connected successfully");
    } catch (error) {
        console.log("database connection failed",error);
    }
}

export {connect};