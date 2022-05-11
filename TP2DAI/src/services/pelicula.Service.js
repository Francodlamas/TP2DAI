import sql from 'mssql'
import config from '../../db.js'
import 'dotenv/config'

const peliculaTabla = process.env.DB_TABLA_PELICULA;

export class peliculaService {

    getMovies = async () => {
        console.log('This is a function on the service');

        const pool = await sql.connect(config);
        const response = await pool.request().query(`SELECT Id,imagen,titulo,fechaCreacion from ${peliculaTabla}`);
        console.log(response)

        return response.recordset;
    }


}


