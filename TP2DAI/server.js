import express from "express";
import cors from "cors";
import PersonajeRuta from "./src/controller/personajeController.js";
import PeliculaRuta from "./src/controller/peliculaController.js";
import passport from 'passport';
import {jwtStrategy} from './src/common/jwt.strategy.js';
import LoginRuta from "./src/controller/loginController.js";


const app=express();
const port=5000;

app.use(cors());
app.use(express.json());
passport.use(jwtStrategy);
app.use(passport.initialize());

app.use('/characters',PersonajeRuta);
app.use('/login',LoginRuta);
app.use('/pelicula',PeliculaRuta);

app.listen(port,()=>{

console.log(`Listen on port ${port}`);

})






