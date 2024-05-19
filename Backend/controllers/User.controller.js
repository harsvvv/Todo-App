import { User } from "../models/User.model.js";


const create=async(req,res)=>{
    const {title,discription}=req.body;
    if (!title) {
        return res.status(400).json({ error: "Title missing" });
    }
    if (!discription) {
        return res.status(400).json({ error: "Discription missing" });
    }
    console.log(req.body);
      try {
        const find=await User.find({title});
        if(find.length>0){
            
            return res.status(400).json({"response":"Title already exist"});
        }
        const response=await User.create({
            title,
            discription
        })
        if(!res){
            return res.status(400).json({"error":"data not stored successfully"})
            
        }
        console.log(response);
        return res.status(200).json({"success":"data saved successfully",response});
      } catch (error) {
        console.log(error);
        return res.status(400).json({"error":"catch error"})
        
      }
    
}
const updateBoth=async(req,res)=>{
    const {title,newtitle,newdiscription}=req.body;
    const find=await User.find({title});
    const data={};
    data.title=newtitle;
    data.discription=newdiscription;
    if(find.length==0){
        return res.status(400).json({ "error": "User does not exist" });
     }
     const updating=await User.findByIdAndUpdate(find[0]._id,data,{ new: true });
     if (!updating) {
        return res.status(400).json({ error: "Failed to update user" });
    }

    return res.status(200).json({ success: "User updated successfully", user: updating });
     }

     const updateTitle=async(req,res)=>{
        try {
            const {title,newtitle}=req.body;
            const obj={};
            obj.title=newtitle;
            const find=await User.find({title});
            if(find.length===0){
                return res.status(400).json({"error":"Title does not exist"});
            }
            if(newtitle.length===0){
                return res.status(400).json({"error":"newtitle is empty"});
            }
            const updating=await User.findByIdAndUpdate(find[0]._id,obj,{new:true});
            return res.status(200).json({"Success":"Title updated succesfully",user:updating});

        } catch (error) {
            console.log("error",error);
            return res.status(400).json({"error":"something went wrong"});
        }
     }
     const read=async(req,res)=>{
      try {
        const data=await User.find();
        if(!data || data.length===0){
            return res.status(400).json({"error":"nothing is there in DB"});
        }
        return res.status(200).json({user:data});
        
      } catch (error) {
        console.log(error);
        return res.status(400).json({problem:error});
      }
     }
     const remove=async (req,res)=>{
    try {
        const {title}=req.body;
        const find=await User.find({title});
        if(find.length==0 || !find){
            return res.status(400).json({"Error":"User does not exist"});
        }

        const del=await User.findByIdAndDelete(find[0]._id)
        if(!del){
            return res.status(400).json({"Error":"User does not exist inside del"});
        }
        return res.status(200).json({ success: "User deleted successfully", user: del })
    } catch (error) {
        return res.status(400).json({"Error":"Something Went Wrong"});
    }
     }


export {create,updateBoth,updateTitle,read,remove};