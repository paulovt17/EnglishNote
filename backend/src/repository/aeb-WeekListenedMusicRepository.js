import connection from "./connection.js";

/*
select music_name, artist, length, imagem, id_usuario
from tb_musics
where data < ? and data > ? and visto = ?;*/



export async function musicasSemana({startDate, endDate, visto}){
    const comando = `
        select
            id_music,
            music_name      music,
            artist,
            length,
            cover
            from pivitiel_db.tb_musics
            WHERE data < ? AND data > ? AND visto =?;
            `
    let registros = await connection.query(comando, [endDate, startDate, visto])
    return registros[0]
}
