import sql from 'mssql'
import config from '../../db.js'
import 'dotenv/config'

const personajeTabla = process.env.DB_TABLA_PERSONAJE;


export class personajeService {

    buscador = async (nombre,edad,peso,idMovie) => {
        console.log('This is a function on the service');
        const pool = await sql.connect(config);
        let response;
        let query=`SELECT imagen,nombre,id from ${personajeTabla}  `;
        if (idMovie!=null) {
            query=query+" INNER JOIN PersonajeXPelicula ON Personaje.id= PersonajeXPelicula.idPersonajeAsociado where PersonajeXPelicula.IdPeliculasAsociadas=@idMovie  "
        }
        if(nombre!=null){
            if(idMovie!=null){ query=query+" and"}else{ query=query+ " where "}
            query=query+"  nombre=@nombre ";
        }
        if(edad!=null){
            if(idMovie!=null || nombre!=null){ query=query+" and"}else{ query=query+ " where "} 
            query=query+" edad=@edad "
        }
        if(peso!=null){
            if(idMovie!=null || nombre!=null || edad!=null){ query=query+" and"}else{ query=query+ " where "} 
            query=query+"  peso=@peso "
        }
        console.log(query);
        console.log(nombre)
        response = await pool.request().input('nombre',sql.VarChar,nombre).input('edad',sql.Int, edad).
        input('peso',sql.Int, peso).input('idMovie',sql.Int, idMovie).query(query);
       
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
        let aux;
        aux=[Personaje.recordset, response.recordset]
        return aux;
    }

    
}