import { Router } from 'express';
import { PersonajeService } from '../services/personajeService.js';


const router = Router();
const pizzaService = new personajeService();

router.get('', async (req, res) => {
  
    
    const personaje = await personajeService.getPizza();
  
    return res.status(200).json(personaje);
  });




