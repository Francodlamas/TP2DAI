import { Router } from 'express';
import { personajeService } from '../services/personajeService.js';

const router = Router();
const personajesService = new personajeService();



router.get('/', async (req, res) => {
    const personajes = await personajesService.getAllPersonajes();
  
    console.log("getAll");

    return res.status(200).json(personajes);

  });

  router.get('/:id', async (req, res) => {
    const id = req.params.id
    console.log(`Request URL Param: ${id}`);
    console.log(`This is a get operation`);
  
    const personaje = await personajesService.getPersonajeById(id);
  
    return res.status(200).json(personaje);
  });
  
  router.post('/', async (req, res) => {
    console.log(`This is a post operation`);

    const personaje = await personajesService.createPersonaje(req.body);

    return res.status(201).json(personaje);
  });

  router.put('/:id', async (req, res) => {
    console.log(`Request URL Param: ${req.params.id}`);
    console.log(`This is a put operation`);
    
    const personaje = await personajesService.updatePersonajeById(req.body);
    
    return res.status(200).json(personaje);
  });
  
  router.delete('/:id', async (req, res) => {
    console.log(`Request URL Param: ${req.params.id}`);
    console.log(`This is a delete operation`);
    
    const personaje = await personajesService.deletePersonajeById(req.params.id);
    
    return res.status(200).json(personaje);
  });

  export default router;