import {Router} from "express";
import { create,updateBoth,updateTitle,read,remove } from "../controllers/User.controller.js";


const router=Router();

router.post('/create', create); 
router.post('/update',updateBoth);
router.post('/updateTitle',updateTitle);
router.get('/read',read);
router.post('/remove',remove)



export {router};



