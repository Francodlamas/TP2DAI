import { Router } from 'express';
import { personajeService } from '../services/personajeService.js';
import { Authenticate } from '../common/jwt.strategy.js';



const router = Router();
const personajesService = new personajeService();




router.get('/',Authenticate, async (req, res) => {
  const nombre = req.query.nombre
  const edad = req.query.edad
  const peso = req.query.peso
  const idMovie = req.query.idMovie
    const personajes = await personajesService.buscador(nombre,edad,peso,idMovie);
  
    console.log("buscador");

    return res.status(200).json(personajes);

  });


  
  router.post('/',Authenticate, async (req, res) => {
    console.log(`This is a post operation`);

    const personaje = await personajesService.createPersonaje(req.body);

    return res.status(201).json(personaje);
  });

  router.put('/:id',Authenticate, async (req, res) => {
    console.log(`Request URL Param: ${req.params.id}`);
    console.log(`This is a put operation`);
    const id = req.params.id;
    const personaje = await personajesService.updatePersonajeById(id,req.body);
    
    return res.status(200).json(personaje);
  });
  
  
  router.delete('/:id',Authenticate, async (req, res) => {
    console.log(`Request URL Param: ${req.params.id}`);
    console.log(`This is a delete operation`);
    
    const personaje = await personajesService.deletePersonajeById(req.params.id);
    
    return res.status(200).json(personaje);
  });
  router.get('/:id',Authenticate, async (req, res) => {
    const id = req.params.id
    console.log(`Request URL Param: ${id}`);
    console.log(`This is a get operation`);
  
    const personaje = await personajesService.detallePersonaje(id);
  
    return res.status(200).json(personaje);
  });

  export default router;