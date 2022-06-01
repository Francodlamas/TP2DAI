import sql from 'mssql'
import config from '../../db.js'
import 'dotenv/config'

const peliculaTabla = process.env.DB_TABLA_PELICULA;
const PersonajeXPelicula=process.env.DB_TABLA_PERSONAJEXPELICULA;
export class peliculaService {

    getMovies = async () => {
        console.log('This is a function on the service');

        const pool = await sql.connect(config);
        const response = await pool.request().query(`SELECT Id,imagen,titulo,fechaCreacion from ${peliculaTabla}`);
        console.log(response)

        return response.recordset;
    }


    detallePelicula = async (id) => {
        console.log('This is a function on the service');

        const pool = await sql.connect(config);
        const Pelicula = await pool.request()
            .input('id',sql.Int, id)
            .query(`SELECT * from ${peliculaTabla} where id = @id`);
      
        const idPersonaje = await pool.request()
        .input('id',sql.Int, id)
        .query(`SELECT PersonajeXPelicula.idPersonajeAsociado from  ${PersonajeXPelicula} 
        INNER JOIN PersonajeXPelicula ON Pelicula.Id= PersonajeXPelicula.idPersonajeAsociado 
        where Pelicula.Id = @id`);
        console.log(idPersonaje)
        let aux;
        aux=[Pelicula.recordset, response.recordset]

        return aux;
    }
    

    buscador = async (titulo) => {
        console.log('This is a function on the service');
        const pool = await sql.connect(config);
        let response;
        if(titulo==null){
             response = await pool.request().query(`SELECT * from ${peliculaTabla}`);
        }
        else{
             response = await pool.request().input('titulo',sql.VarChar,titulo).query(`SELECT * from ${peliculaTabla} where titulo=@titulo`);
        }
       
        console.log(response)

        return response.recordset;
    }

}


