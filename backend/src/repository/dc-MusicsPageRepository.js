import connection from "./connection.js";

/*select music_name, artist, length, cover, visto, id_usuario
from tb_musics;

select music_name, artist, length, cover, visto, id_usuario
from tb_musics
where music_name like '?%' or artist like '?%';

delete from tb_musics
where id_music = ?;*/



export async function musicas(){
    const comando = `
        select
            id_music,
            music_name      music,
            artist,
            length,
            cover,
            visto
            from pivitiel_db.tb_musics
            order by visto, music_name
            `
    let registros = await connection.query(comando)
    let resposta = registros[0]

    for(let i in resposta){
        resposta[i].cover=resposta[i].cover?.toString();
    }

    return resposta;
}
export async function musicasFiltradas(music){
    const comando = `
         select
            id_music,
            music_name      music,
            artist,
            length,
            cover,
            visto
            from pivitiel_db.tb_musics
            where music_name like CONCAT(?, '%') or artist like CONCAT(?, '%')
            `
    let registros = await connection.query(comando, [music.music, music.artist])
    let resposta = registros[0]

    for(let i in resposta){
        resposta[i].cover=resposta[i].cover?.toString();
    }

    return resposta;
}

export async function deletarMusica(id){
    const comando = `
        delete from pivitiel_db.tb_musics
        where id_music = ?
            `
    let registros = await connection.query(comando, [id])
    let info = registros[0]
    return info.affectedRows;
}
