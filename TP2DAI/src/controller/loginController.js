import { Router } from 'express';
import { loginService } from '../services/loginService.js';


const router = Router();

router.get('', async (req, res) => {
    
    const token= await  loginService.getSignedToken();
    console.log(token);
    return res.status(200).json(token);

});

export default router;
