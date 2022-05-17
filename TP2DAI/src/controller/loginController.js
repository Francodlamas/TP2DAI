import { Router } from 'express';
import { loginService } from '../services/loginService.js';


const router = Router();
const AuthService = new loginService();

router.get('', async (req, res) => {
    
    const token= await  AuthService.getSignedToken();
    console.log(token);
    return res.status(200).json(token);

});

export default router;
