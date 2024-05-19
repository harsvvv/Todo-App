/* eslint-disable no-unused-vars */
import { FaUserEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from 'axios';
import { useEffect, useState } from "react";
const Todo = () => {
    const [data,setDate]=useState([]);
    const [title,setTitle]=useState("");
    const [description,setDescription]=useState("");
    const [update,setUpdate]=useState(false);

    const remove = async (item) => {
        try {
          const res = await axios.post("http://localhost:8000/api/v1/users/remove", {
            title: item.title
          });
          console.log(res);
          console.log("Removed successfully");
      
          // Use the state updater function to ensure state updates are applied correctly
          setTitle(prevTitle => prevTitle === item.title ? '' : prevTitle);
          setDescription(prevDescription => prevDescription === item.description ? '' : prevDescription);
          setUpdate(prev => !prev);
      
        } catch (error) {
          console.log("not deleted", error);
        }
      }
      
    const add=async()=>{
        console.log("inside add");
        try {
          const res=  await axios.post("http://localhost:8000/api/v1/users/create",{
                title:title,
                discription:description
            });
            console.log(res);
            console.log("added successfully");
            setTitle('');
            setDescription('');
            setUpdate((prev)=>!prev);
            
        } catch (error) {
            console.log("something went ",error);
        }
    }

       const getData=async()=>{
        try {
        const response = await axios.get("http://localhost:8000/api/v1/users/read") ;

        console.log("this is the response",response.data.user);
        setDate(response.data.user);
        } catch (error) {
            console.log("getting error",error);
        }
       }
       useEffect(() => {
       getData()

      }, [update,title,description]);
    return (
      <div className="flex justify-center items-center h-[80%] mt-20">
        <div className="w-full max-w-[80%] flex flex-col items-center">
        
          <div className="border-2 flex w-full md:w-[60%] lg:w-[50%] border-black py-1 px-2 rounded-md mb-4">
            <div className="w-[80%]">
            <div className="flex border border-black">
            <span className="mx-2">Title:</span>
            <input value={title} onChange={(e)=>setTitle(e.target.value)} type="text mx-1 px-1" className="outline-none w-[70%]"/></div>
            <div className="flex border border-black">
            <span className="mx-2">
                Description:
            </span>
            <input value={description} onChange={(e)=>setDescription(e.target.value)} type="text" className="outline-none w-[70%] py-1"/></div>
            
            </div>
            <button onClick={add} className="rounded bg-red-200 w-[20%] px-2 py-1 mx-2">Add</button>
          </div>
          {
  data.map((item, index) => {
    return (
      <div key={item.title} className="border-2 flex items-center justify-between w-full md:w-[60%] lg:w-[50%] border-black py-1 px-2 rounded-md mb-4">
        <div>
          <h1><span className="font-bold">Title:</span> {item.title}</h1>
          <p className="font-md"><span className="font-bold">Description:</span> {item.discription}</p>
        </div>
        <div className="flex">
          <button  className="flex items-center mx-1 bg-blue-400 py-1 px-1 rounded-md"><FaUserEdit /> Update</button>
          
          <button onClick={()=>remove(item)} className="flex items-center bg-blue-400 py-1 px-1 rounded-md"><MdDelete /> Delete</button>
        </div>
      </div>
    );
  })
}

        </div>
      </div>
    );
  };
  
  export default Todo;
  