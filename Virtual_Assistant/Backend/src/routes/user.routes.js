import express from 'express'
import { askToAssistant, getCurrentUser, updateAssistant } from '../controllers/user.controller.js';
import isAuth from '../middlewares/isAuth.js';

import upload from '../middlewares/multer.js';

const userRouter = express.Router();

//get current user route
userRouter.get("/current",isAuth,getCurrentUser)

//update current user route
userRouter.post("/update",isAuth,upload.single("assistantImage"),updateAssistant)

//gemini command
userRouter.post("/asktoassistant",isAuth,askToAssistant)

export default userRouter