import { Router } from 'express';
import { peliculaService } from '../services/peliculaService.js';
import { Authenticate } from '../common/jwt.strategy.js';



const router = Router();
const peliService = new peliculaService();



router.post('/',Authenticate, async (req, res) => {
  console.log(`This is a post operation`);

  const pelicula = await peliService.createPelicula(req.body);

  return res.status(201).json(pelicula);
});

router.put('/:id',Authenticate, async (req, res) => {
  console.log(`Request URL Param: ${req.params.id}`);
  console.log(`This is a put operation`);
  const id = req.params.id;
  const pelicula = await peliService.updatePeliculaById(id,req.body);
  
  return res.status(200).json(pelicula);
});


router.get('/',Authenticate, async (req, res) => {
    console.log(`This is a get operation`);
    
    const pelicula = await peliService.getMovies();
  
    return res.status(200).json(pelicula);
  });
  router.delete('/:id',Authenticate, async (req, res) => {
    console.log(`Request URL Param: ${req.params.id}`);
    console.log(`This is a delete operation`);
    
    const pelicula = await peliService.deletePeliculaById(req.params.id);
    
    return res.status(200).json(pelicula);
  });

  router.get('/:id',Authenticate, async (req, res) => {
    const id = req.params.id
    console.log(`Request URL Param: ${id}`);
    console.log(`This is a get operation`);
  
    const personaje = await peliService.detallePelicula(id);
  
    return res.status(200).json(personaje);
  });





export default router;




