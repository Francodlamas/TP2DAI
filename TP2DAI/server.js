import express from "express";
import cors from "cors";
import PersonajeRuta from "./src/controller/personajeController.js";

const app=express();
const port=5000;

app.use(cors());
app.use(express.json());

app.use('/personaje',PersonajeRuta);

app.listen(port,()=>{

console.log(`Listen on port ${port}`);

})






