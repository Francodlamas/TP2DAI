import sql from 'mssql'
import config from '../../db.js'
import 'dotenv/config'

const personajeTabla = process.env.DB_TABLA_PERSONAJE;
const peliculaTabla = process.env.DB_TABLA_PELICULA;

export class personajeService {

    buscador = async (nombre,edad) => {
        console.log('This is a function on the service');
        const pool = await sql.connect(config);
        let response;
        if(nombre==null && edad==null){
            response = await pool.request().query(`SELECT imagen,nombre,id from ${personajeTabla}`);
        }
        else if(nombre==null){
             response = await pool.request().input('edad',sql.Int,edad).query(`SELECT imagen,nombre,id from ${personajeTabla} where edad=@edad`);
        }
        else if(edad==null){
             response = await pool.request().input('nombre',sql.VarChar,nombre).query(`SELECT imagen,nombre,id from ${personajeTabla} where nombre=@nombre `);
        }else{
             response = await pool.request().input('nombre',sql.VarChar,nombre).input('edad',sql.Int, edad).query(`SELECT imagen,nombre,id from ${personajeTabla} where nombre=@nombre and edad=@edad`);
        }
       
        console.log(response)
    
        return response.recordset;
    }




    createPersonaje = async (personaje) => {
        console.log('This is a function on the service');

        const pool = await sql.connect(config);
        const response = await pool.request()
            .input('Nombre',sql.VarChar(50), personaje?.nombre ?? '')
            .input('Edad',sql.Int, personaje?.edad ?? false)
            .input('Peso',sql.Int, personaje?.peso ?? 0)
            .input('Historia',sql.VarChar(50), personaje?.historia ?? '')
            .input('Imagen',sql.VarChar(50), personaje?.imagen ?? '')
            .query(`INSERT INTO ${personajeTabla}(Nombre, Edad, Peso, Historia,Imagen) VALUES (@Nombre, @Edad, @Peso, @Historia, @Imagen)`);
        console.log(response)

        return response.recordset;
    }

    updatePersonajeById = async (id,personaje) => {
        console.log('This is a function on the service');

        const pool = await sql.connect(config);
        const response = await pool.request()
            .input('id',sql.Int, id ?? 0)
            .input('Nombre',sql.VarChar(50), personaje?.nombre ?? '')
            .input('Edad',sql.Int, personaje?.edad ?? false)
            .input('Peso',sql.Int, personaje?.peso ?? 0)
            .input('Historia',sql.VarChar(50), personaje?.historia ?? 0)
            .input('Imagen',sql.VarChar(50), personaje?.imagen ?? '')
            .query(`UPDATE ${personajeTabla} SET nombre = @Nombre, edad = @Edad, peso = @Peso, historia = @Historia, imagen = @Imagen  WHERE id = @id`);
        console.log(response)

        return response.recordset;
    }


    deletePersonajeById = async (id) => {
        console.log('This is a function on the service');

        const pool = await sql.connect(config);
        const response = await pool.request()
            .input('id',sql.Int, id)
            .query(`DELETE FROM ${personajeTabla} WHERE id = @id`);
        console.log(response)

        return response.recordset;
    }

    detallePersonaje = async (id) => {
        console.log('This is a function on the service');

        const pool = await sql.connect(config);
        const Personaje = await pool.request()
            .input('id',sql.Int, id)
            .query(`SELECT * from ${personajeTabla} where id = @id`);
            const response = await pool.request()
            .input('id',sql.Int, id)
            .query(`SELECT Pelicula.titulo from  ${personajeTabla} INNER JOIN PersonajeXPelicula ON Personaje.id= PersonajeXPelicula.idPersonajeAsociado 
            INNER JOIN Pelicula ON Pelicula.id= PersonajeXPelicula.IdPeliculasAsociadas where Personaje.id = @id`);
           
        console.log(response)
      
        return response.recordset;
    }

    
}