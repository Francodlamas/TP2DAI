import sql from 'mssql'
import config from '../../db.js'
import 'dotenv/config'

const peliculaTabla = process.env.DB_TABLA_PELICULA;
const PersonajeXPelicula=process.env.DB_TABLA_PERSONAJEXPELICULA;
export class peliculaService {

    createPelicula = async (pelicula) => {
        console.log('This is a function on the service');

        console.log(pelicula)
        const pool = await sql.connect(config);
        const response = await pool.request()
            .input('imagen',sql.VarChar(50), pelicula?.imagen ?? '')
            .input('titulo',sql.VarChar(50), pelicula?.titulo ?? '')
            .input('fechaCreacion',sql.Date, pelicula?.fechaCreacion ?? 0)
            .input('calificacion',sql.Int, pelicula?.calificacion  ?? 0)
            .query(`INSERT INTO ${peliculaTabla} (imagen, titulo, fechaCreacion, calificacion) VALUES (@imagen, @titulo, @fechaCreacion, @calificacion)`);
        console.log(response)
        return response.recordset;
    }
    updatePeliculaById = async (id,pelicula) => {
        console.log('This is a function on the service');

        const pool = await sql.connect(config);
        const response = await pool.request()
        .input('Id',sql.Int, id ?? 0)
        .input('imagen',sql.VarChar(50), pelicula?.imagen ?? '')
        .input('titulo',sql.VarChar(50), pelicula?.titulo ?? '')
        .input('fechaCreacion',sql.Date, pelicula?.fechaCreacion ?? 0)
        .input('calificacion',sql.Int, pelicula?.calificacion  ?? 0)
        .query(`UPDATE ${peliculaTabla} SET imagen = @imagen, titulo = @titulo, fechaCreacion = @fechaCreacion, calificacion = @calificacion WHERE Id = @Id`);
        console.log(response)

        return response.recordset;
    }
    deletePeliculaById = async (id) => {
        console.log('This is a function on the service');

        const pool = await sql.connect(config);
        const response = await pool.request()
            .input('id',sql.Int, id)
            .query(`DELETE FROM ${peliculaTabla} WHERE Id = @id`);
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
        where IdPeliculasAsociadas = @id`);
        let aux;
        aux=[Pelicula.recordset, idPersonaje.recordset]
        console.log(aux)
        return aux;
    }
    buscador = async (titulo,order) => {
        console.log('This is a function on the service');
        const pool = await sql.connect(config);
        let response;
        if(titulo==null){
             response = await pool.request().query(`SELECT * from ${peliculaTabla} order by fechaCreacion ${order??'asc'}`);
        }
        else{
             response = await pool.request().input('titulo',sql.VarChar,titulo).query(`SELECT * from ${peliculaTabla} where titulo=@titulo order by fechaCreacion ${order??'asc'} `);
        }
       
        console.log(response)

        return response.recordset;
    }

}


