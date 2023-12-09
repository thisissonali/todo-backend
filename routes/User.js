import  Express  from "express";
import {register , login , getMyDetails , logout} from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = Express.Router();

router.post('/register', register)

router.post('/login',login)

router.get('/me', isAuthenticated ,getMyDetails)

router.get('/logout', logout);

export default router;