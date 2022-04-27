import sql from 'mssql'
import config from '../../db.js'
import 'dotenv/config'

const personajeTabla = process.env.DB_TABLA_PERSONAJE;

export class personajeService {

    getAllPersonajes = async () => {
        console.log('This is a function on the service');
        const pool = await sql.connect(config);
        const response = await pool.request().query(`SELECT * from ${personajeTabla}`);
        console.log(response)

        return response.recordset;
    }

    getPersonajeById = async (id) => {
        console.log('This is a function on the service');

        const pool = await sql.connect(config);
        const response = await pool.request()
            .input('id',sql.Int, id)
            .query(`SELECT * from ${personajeTabla} where id = @id`);
        console.log(response)

        return response.recordset[0];
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

    updatePersonajeById = async (personaje) => {
        console.log('This is a function on the service');

        const pool = await sql.connect(config);
        const response = await pool.request()
            .input('Id',sql.Int, personaje?.id ?? 0)
            .input('Nombre',sql.VarChar(50), personaje?.nombre ?? '')
            .input('Edad',sql.Int, personaje?.edad ?? false)
            .input('Peso',sql.Int, personaje?.peso ?? 0)
            .input('Historia',sql.VarChar(50), personaje?.Historia ?? 0)
            .input('Imagen',sql.VarChar(50), personaje?.Imagen ?? '')
            .query(`UPDATE personaje SET Nombre = @Nombre, LibreGluten = @LibreGluten, Importe = @Importe, Descripcion = @Descripcion WHERE id = @Id`);
        console.log(response)

        return response.recordset;
    }

    deletePizzaById = async (id) => {
        console.log('This is a function on the service');

        const pool = await sql.connect(config);
        const response = await pool.request()
            .input('id',sql.Int, id)
            .query(`DELETE FROM ${pizzaTabla} WHERE id = @id`);
        console.log(response)

        return response.recordset;
    }
}