import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const UserSchema=new Schema({
      title:{
        type:String,
        required:true
      },
      discription:{
        type:String,
        required:true
      }
},
{timestamps:true}
  )

  export const User=mongoose.model("User",UserSchema);




